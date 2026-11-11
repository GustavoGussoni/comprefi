import assert from "node:assert/strict";
import { test } from "node:test";
import {
  emptyClient,
  newSale,
  total,
  cardFee,
  validateSale,
  type CatalogItem,
} from "../model";
import {
  validateCpf,
  validateEmail,
  validateCustomer,
  normalizeClient,
} from "../customerValidation";
import { lookupCep, viaCepUrl } from "../cepLookup";
import { SubmissionAttempt } from "../submissionAttempt";
import { createPayload } from "../payload";
import {
  DELIVERY_DEADLINE_EXPIRED_MESSAGE,
  publicSubmissionValidationMessage,
} from "../submissionError";

const variant: CatalogItem = {
  id: "variant-test",
  groupSlug: "test-group",
  product: "Produto de teste",
  model: "Produto de teste",
  storage: "128 GB",
  color: "Preto",
  condition: "Novo e lacrado",
  image: "",
  category: "teste",
  crmSku: "PRIVATE-SKU",
  crmMappingStatus: "confirmed",
};

test("CPF mathematical check rejects repeated, incomplete and altered digits", () => {
  assert.equal(validateCpf("111.444.777-35"), true);
  for (const cpf of [
    "111.111.111-11",
    "00000000000",
    "11144477734",
    "1114447773",
    "",
  ])
    assert.equal(validateCpf(cpf), false);
});

test("Email validation checks syntax without pretending to verify identity", () => {
  for (const email of [
    "cliente+teste@example.com",
    " Pessoa@example.com ",
    "x@sub.example.com",
  ])
    assert.equal(validateEmail(email), true);
  for (const email of [
    "x@localhost",
    "x..y@example.com",
    ".x@example.com",
    "x@-example.com",
    "x@@example.com",
    "x y@example.com",
    "x@example.c",
  ])
    assert.equal(validateEmail(email), false);
});

test("Customer starts empty, normalizes and requires both steps", () => {
  assert.ok(Object.values(emptyClient).every((value) => value === ""));
  const client = normalizeClient({
    ...emptyClient,
    name: " Pessoa Teste ",
    cpf: "11144477735",
    phone: "11987654321",
    email: " x@example.com ",
    birth: "1990-01-01",
    cep: "01001000",
    street: "Rua Teste",
    number: "S/N",
    district: "Centro",
    city: "São Paulo",
    state: "sp",
  });
  assert.equal(client.state, "SP");
  assert.equal(client.email, "x@example.com");
  assert.deepEqual(validateCustomer(client), {});
  assert.ok(Object.keys(validateCustomer(emptyClient)).length > 5);
});

test("One idempotency key persists through double click, unknown failure and same body replay", () => {
  let count = 0;
  const attempt = new SubmissionAttempt(() => `key-${++count}`);
  const key = attempt.begin("body-A");
  assert.equal(attempt.begin("body-A"), null);
  attempt.fail();
  assert.equal(attempt.canEdit(), false);
  assert.throws(() => attempt.begin("body-B"), /não foi confirmado/);
  assert.equal(attempt.begin("body-A"), key);
  attempt.fail(409);
  assert.equal(attempt.canEdit(), false);
  assert.equal(attempt.begin("body-A"), key);
  attempt.succeed();
  assert.equal(attempt.begin("body-A"), null);
  assert.equal(count, 1);
});

test("Known validation failure retains key for same body, rotates only if edited", () => {
  let count = 0;
  const attempt = new SubmissionAttempt(() => `key-${++count}`);
  const key = attempt.begin("body-A");
  attempt.fail(400);
  assert.equal(attempt.canEdit(), true);
  assert.equal(attempt.begin("body-A"), key);
  attempt.fail(422);
  assert.notEqual(attempt.begin("body-B"), key);
  assert.equal(count, 2);
});

test("Expired delivery deadline uses only allowlisted copy, never the raw server message", () => {
  const recognized = {
    code: "delivery_deadline_expired",
    message: "PRIVATE SERVER DETAILS MUST NOT APPEAR",
  };
  assert.equal(
    publicSubmissionValidationMessage(400, recognized),
    DELIVERY_DEADLINE_EXPIRED_MESSAGE,
  );
  for (const body of [
    null,
    [],
    "html",
    { message: "raw error" },
    { code: "other" },
  ]) {
    assert.equal(publicSubmissionValidationMessage(400, body), undefined);
  }
  for (const status of [401, 409, 422, 500]) {
    assert.equal(
      publicSubmissionValidationMessage(status, recognized),
      undefined,
    );
  }
});

test("Create DTO excludes client-provided SKU, image and extra seller fields", () => {
  const sale = newSale();
  sale.items[0] = {
    ...sale.items[0],
    variantId: variant.id,
    crmSku: "spoofed",
    crmProductId: "spoofed",
    crmMappingStatus: "confirmed",
    image: "https://external.invalid/img",
  };
  const payload = createPayload({ ...sale, ...{ seller: "spoofed" } });
  assert.equal(payload.items[0].crmSku, undefined);
  assert.equal(payload.items[0].crmProductId, undefined);
  assert.equal(payload.items[0].image, "");
  assert.ok(!("seller" in payload));
});

test("Negotiated totals are manual; credit is not subtracted again and condition cannot impersonate a sealed SKU", () => {
  const sale = newSale();
  sale.whatsapp = "11987654321";
  sale.base = 100;
  sale.pix = 40;
  sale.card = 66;
  sale.payment = "mixed";
  sale.credit = 50;
  sale.items[0] = { ...sale.items[0], ...variant, variantId: variant.id };
  assert.equal(total(sale), 106);
  assert.equal(cardFee(sale), 6);
  assert.equal(validateSale(sale, [variant]), null);
  sale.items[0].condition = "Seminovo";
  assert.match(validateSale(sale, [variant]) || "", /combinação válida/);
});

test("Unknown central condition requires explicit declaration without changing negotiated totals", () => {
  const unknown = { ...variant, condition: "" };
  const sale = newSale();
  sale.whatsapp = "11987654321";
  sale.base = 100;
  sale.pix = 100;
  sale.card = 0;
  sale.payment = "pix";
  sale.items[0] = { ...sale.items[0], ...unknown, variantId: unknown.id };
  assert.match(validateSale(sale, [unknown]) || "", /condição/);
  for (const condition of ["Novo e lacrado", "Seminovo"]) {
    sale.items[0].condition = condition;
    assert.equal(validateSale(sale, [unknown]), null);
    assert.equal(total(sale), 100);
  }
  sale.items[0].condition = "Condição não declarada";
  assert.match(validateSale(sale, [unknown]) || "", /combinação válida/);
});

test("ViaCEP receives only CEP without credentials, token or referrer", async () => {
  const result = await lookupCep("01001-000", {
    fetchImpl: (async (url, options) => {
      assert.equal(url, viaCepUrl("01001000"));
      assert.equal(options?.credentials, "omit");
      assert.equal(options?.referrerPolicy, "no-referrer");
      assert.equal(options?.body, undefined);
      assert.equal(options?.headers, undefined);
      return new Response(
        JSON.stringify({
          cep: "01001-000",
          logradouro: "Praça Teste",
          bairro: "Centro",
          localidade: "São Paulo",
          uf: "SP",
        }),
        { status: 200 },
      );
    }) as typeof fetch,
  });
  assert.equal(result.status, "found");
});

test("ViaCEP invalid/missing/malformed/timeout/aborted results support manual fallback", async () => {
  assert.equal((await lookupCep("123")).status, "invalid");
  assert.equal(
    (
      await lookupCep("01001000", {
        fetchImpl: (async () => new Response('{"erro":true}')) as typeof fetch,
      })
    ).status,
    "not-found",
  );
  assert.equal(
    (
      await lookupCep("01001000", {
        fetchImpl: (async () =>
          new Response(
            '{"cep":"01001-000","localidade":"SP","uf":"XX"}',
          )) as typeof fetch,
      })
    ).status,
    "error",
  );
  const waitsForAbort = (async (_url, init) =>
    new Promise<Response>((_resolve, reject) => {
      const abort = () => reject(new DOMException("Aborted", "AbortError"));
      if (init?.signal?.aborted) abort();
      else init?.signal?.addEventListener("abort", abort, { once: true });
    })) as typeof fetch;
  assert.equal(
    (await lookupCep("01001000", { timeoutMs: 1, fetchImpl: waitsForAbort }))
      .status,
    "timeout",
  );
  const controller = new AbortController();
  controller.abort();
  assert.equal(
    (
      await lookupCep("01001000", {
        signal: controller.signal,
        fetchImpl: waitsForAbort,
      })
    ).status,
    "aborted",
  );
});

import {
  bucketLabels,
  canArchiveSheet,
  canEditSheet,
  canUnarchiveSheet,
  editableTerms,
  ownsSheet,
  sheetBucket,
  sheetStateLabel,
} from "../lifecycle";
import type { SheetSnapshot } from "../model";
import { taskLabel } from "../taskLabel";

function snapshot(overrides: Partial<SheetSnapshot> = {}): SheetSnapshot {
  return {
    ...newSale(),
    id: "test-sheet",
    reference: "CF-TEST",
    createdAt: "2026-11-10T00:00:00Z",
    createdBy: {
      id: "sales-1",
      name: "Operador Teste",
      email: "test@example.com",
      role: "SALES",
    },
    revision: 1,
    linkExpiresAt: "2099-01-01T00:00:00Z",
    revoked: false,
    pdf: { status: "waiting", attempts: 0 },
    crm: { status: "waiting", attempts: 0 },
    crmAttachment: { status: "disabled", attempts: 0 },
    ...overrides,
  };
}
test("Pending sheets may be edited, while submitted, cancelled and archived ones cannot", () => {
  assert.equal(canEditSheet(snapshot()), true);
  for (const sheet of [
    snapshot({ submittedAt: "2026-11-10" }),
    snapshot({ revoked: true }),
    snapshot({ archivedAt: "2026-11-10" }),
  ])
    assert.equal(canEditSheet(sheet), false);
});
test("Archive is reserved for received/cancelled records and does not reopen them", () => {
  assert.equal(canArchiveSheet(snapshot()), false);
  assert.equal(canArchiveSheet(snapshot({ submittedAt: "2026-11-10" })), true);
  assert.equal(canArchiveSheet(snapshot({ revoked: true })), true);
  assert.equal(
    canArchiveSheet(
      snapshot({ submittedAt: "2026-11-10", archivedAt: "2026-11-11" }),
    ),
    false,
  );
});
test("Buckets separate current, cancelled and archived records, including legacy revoked snapshots", () => {
  assert.equal(sheetBucket(snapshot()), "active");
  assert.equal(sheetBucket(snapshot({ submittedAt: "2026-11-10" })), "active");
  assert.equal(sheetBucket(snapshot({ revoked: true })), "cancelled");
  assert.equal(
    sheetBucket(snapshot({ revoked: true, archivedAt: "2026-11-10" })),
    "archived",
  );
  assert.equal(bucketLabels.active, "Em andamento");
  assert.equal(sheetStateLabel(snapshot({ revoked: true })), "Cancelado");
});
test("ADMIN sees team sheets; SALES sees only its own records", () => {
  const sheet = snapshot();
  assert.equal(
    ownsSheet({ ...sheet.createdBy, id: "admin", role: "ADMIN" }, sheet),
    true,
  );
  assert.equal(ownsSheet(sheet.createdBy, sheet), true);
  assert.equal(
    ownsSheet({ ...sheet.createdBy, id: "other-sales" }, sheet),
    false,
  );
});
test("Editor copies only terms without carrying customer, document or archive fields", () => {
  const sheet = snapshot({
    customer: { ...emptyClient, name: "Cliente Teste" },
    archivedAt: "2026-11-10",
  });
  const terms = editableTerms(sheet);
  assert.ok(
    !("customer" in terms) && !("archivedAt" in terms) && !("pdf" in terms),
  );
  terms.items[0].product = "Outro";
  assert.notEqual(sheet.items[0].product, terms.items[0].product);
  assert.ok(!("crmSku" in createPayload(terms).items[0]));
});
test("Editing has its own retry key and locks an uncertain response without affecting creation", () => {
  const create = new SubmissionAttempt(() => "key-create");
  const edit = new SubmissionAttempt(() => "key-edit");
  assert.notEqual(create.begin("same-terms"), edit.begin("same-terms"));
  edit.fail(500);
  assert.equal(edit.begin("same-terms"), "key-edit");
  edit.fail();
  assert.throws(() => edit.begin("changed-terms"));
});
test("Task labels distinguish availability, HTTP send and uncertain result without guaranteeing a business", () => {
  assert.equal(taskLabel({ status: "ready", attempts: 1 }), "Disponível");
  assert.equal(taskLabel({ status: "sent", attempts: 1 }), "Enviado");
  assert.equal(
    taskLabel({ status: "uncertain", attempts: 1 }),
    "Resultado não confirmado",
  );
});

test("Unarchive action appears only on archived orders and buckets use Pedidos terminology", () => {
  assert.equal(canUnarchiveSheet(snapshot()), false);
  assert.equal(
    canUnarchiveSheet(snapshot({ submittedAt: "2026-11-10" })),
    false,
  );
  assert.equal(canUnarchiveSheet(snapshot({ revoked: true })), false);
  assert.equal(
    canUnarchiveSheet(snapshot({ archivedAt: "2026-11-11T10:00:00.000Z" })),
    true,
  );
  assert.equal(bucketLabels.cancelled, "Cancelados");
  assert.equal(bucketLabels.archived, "Arquivados");
  assert.equal(
    sheetStateLabel(snapshot({ archivedAt: "2026-11-11" })),
    "Arquivado",
  );
});
test("Unarchived received orders return to current list but stay uneditable with their document and customer", () => {
  const original = snapshot({
    submittedAt: "2026-11-10",
    customer: { ...emptyClient, name: "Cliente Teste" },
    pdf: { status: "ready", attempts: 1 },
    archivedAt: "2026-11-11",
    archivedBy: "admin",
  });
  const restored = {
    ...original,
    archivedAt: undefined,
    archivedBy: undefined,
  };
  assert.equal(sheetBucket(restored), "active");
  assert.equal(canEditSheet(restored), false);
  assert.equal(canArchiveSheet(restored), true);
  assert.deepEqual(restored.customer, original.customer);
  assert.deepEqual(restored.pdf, original.pdf);
  assert.equal(restored.revision, original.revision);
});
test("Unarchived cancelled orders return to cancelled list and do not reactivate editing", () => {
  const restored = snapshot({ revoked: true });
  assert.equal(sheetBucket(restored), "cancelled");
  assert.equal(canEditSheet(restored), false);
  assert.equal(canArchiveSheet(restored), true);
  assert.equal(sheetStateLabel(restored), "Cancelado");
});

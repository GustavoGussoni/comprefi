export const VIA_CEP_TIMEOUT_MS = 6_000;

export type CepAddress = {
  cep: string;
  street: string;
  district: string;
  city: string;
  state: string;
};

export type CepLookupResult =
  | { status: "found"; address: CepAddress }
  | { status: "not-found" }
  | { status: "invalid" }
  | { status: "timeout" }
  | { status: "aborted" }
  | { status: "error" };

export type CepLookupOptions = {
  fetchImpl?: typeof fetch;
  signal?: AbortSignal;
  timeoutMs?: number;
};

export const cepDigits = (value: string) => value.replace(/\D/g, "");
export const isExactCep = (value: string) => cepDigits(value).length === 8;
export const viaCepUrl = (cep: string) =>
  `https://viacep.com.br/ws/${cepDigits(cep)}/json/`;
const BRAZILIAN_STATES = new Set(
  "AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO".split(
    " ",
  ),
);

function asText(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export function isAbortError(error: unknown): boolean {
  return (
    typeof DOMException !== "undefined" &&
    error instanceof DOMException &&
    error.name === "AbortError"
  );
}

/**
 * Consulta somente um CEP já normalizado. Não envia dados do cliente, headers ou body.
 */
export async function lookupCep(
  cep: string,
  options: CepLookupOptions = {},
): Promise<CepLookupResult> {
  const normalized = cepDigits(cep);
  if (normalized.length !== 8) return { status: "invalid" };

  const controller = new AbortController();
  const timeoutMs = Math.min(
    Math.max(options.timeoutMs ?? VIA_CEP_TIMEOUT_MS, 1),
    VIA_CEP_TIMEOUT_MS,
  );
  let timedOut = false;
  const abortFromParent = () => controller.abort();
  if (options.signal?.aborted) controller.abort();
  else
    options.signal?.addEventListener("abort", abortFromParent, { once: true });
  const timer = setTimeout(() => {
    timedOut = true;
    controller.abort();
  }, timeoutMs);

  try {
    const response = await (options.fetchImpl ?? fetch)(viaCepUrl(normalized), {
      method: "GET",
      credentials: "omit",
      referrerPolicy: "no-referrer",
      redirect: "error",
      signal: controller.signal,
    });
    if (!response.ok) return { status: "error" };

    let payload: unknown;
    try {
      payload = await response.json();
    } catch {
      return { status: "error" };
    }
    if (!payload || typeof payload !== "object" || Array.isArray(payload))
      return { status: "error" };

    const record = payload as Record<string, unknown>;
    if (record.erro === true || record.erro === "true")
      return { status: "not-found" };
    const city = asText(record.localidade);
    const state = asText(record.uf).toUpperCase();
    if (
      typeof record.cep !== "string" ||
      cepDigits(record.cep) !== normalized ||
      city.length < 2 ||
      city.length > 120 ||
      !BRAZILIAN_STATES.has(state)
    )
      return { status: "error" };
    const street = asText(record.logradouro);
    const district = asText(record.bairro);
    const hasControlCharacter = (value: string) =>
      Array.from(value).some(
        (character) =>
          character.charCodeAt(0) < 32 || character.charCodeAt(0) === 127,
      );
    if (
      street.length > 160 ||
      district.length > 120 ||
      [street, district, city].some(hasControlCharacter)
    )
      return { status: "error" };
    return {
      status: "found",
      address: {
        cep: normalized,
        street,
        district,
        city,
        state,
      },
    };
  } catch (error) {
    if (timedOut) return { status: "timeout" };
    if (controller.signal.aborted || isAbortError(error))
      return { status: "aborted" };
    return { status: "error" };
  } finally {
    clearTimeout(timer);
    options.signal?.removeEventListener("abort", abortFromParent);
  }
}

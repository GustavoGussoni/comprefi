import { useEffect, useRef, useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  ClipboardCheck,
  LockKeyhole,
  MapPin,
  RefreshCw,
  ShieldCheck,
  UserRound,
} from "lucide-react";
import { SubmissionAttempt } from "./submissionAttempt";
import { errorStatus, safeError } from "./api";
import { Badge, Brand, Button, Field, Panel, Select, Summary } from "./ui";
import {
  emptyClient,
  type Client,
  type CrmDeliveryMode,
  type PublicSheet,
} from "./model";
import {
  cepDigits,
  customerFieldsForStep,
  firstInvalidCustomerStep,
  formatCep,
  formatCpf,
  getCustomerFieldError,
  normalizeClient,
  validateCustomer,
  validateCustomerStep,
  type CustomerField,
  type CustomerStep,
  type CustomerValidationErrors,
} from "./customerValidation";
import { isExactCep, lookupCep, type CepLookupResult } from "./cepLookup";

type AddressField = "street" | "district" | "city" | "state";
type CepStatus = "idle" | "loading" | "found" | "not-found" | "error";

type CepCacheEntry = Extract<
  CepLookupResult,
  { status: "found" | "not-found" }
>;

const addressFields: AddressField[] = ["street", "district", "city", "state"];
const freshAddressFlags = (): Record<AddressField, boolean> => ({
  street: false,
  district: false,
  city: false,
  state: false,
});
const freshAddressRevisions = (): Record<AddressField, number> => ({
  street: 0,
  district: 0,
  city: 0,
  state: 0,
});

export default function CustomerForm({
  sale,
  crmMode,
  onSubmit,
}: {
  sale: PublicSheet;
  crmMode: CrmDeliveryMode;
  onSubmit: (
    customer: Client,
    idempotencyKey: string,
  ) => Promise<{ reference: string; revision: number }>;
}) {
  const [client, setClient] = useState<Client>({ ...emptyClient });
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [done, setDone] = useState(sale.submitted);
  const [reference, setReference] = useState(sale.reference);
  const [revision, setRevision] = useState(sale.revision);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [touched, setTouched] = useState<
    Partial<Record<CustomerField, boolean>>
  >({});
  const [attemptedSteps, setAttemptedSteps] = useState<
    Partial<Record<CustomerStep, boolean>>
  >({});
  const [cepStatus, setCepStatus] = useState<CepStatus>("idle");
  const [cepNotice, setCepNotice] = useState("");
  const [cepLookupTrigger, setCepLookupTrigger] = useState(0);
  const attempt = useRef(new SubmissionAttempt());
  const submitLock = useRef(false);
  const [locked, setLocked] = useState(false);
  const previousMode = useRef(crmMode);
  const clientRef = useRef(client);
  const cepAbortRef = useRef<AbortController | null>(null);
  const cepRequestId = useRef(0);
  const cepLastHandledTrigger = useRef(0);
  const cepCache = useRef(new Map<string, CepCacheEntry>());
  const addressRevisions = useRef(freshAddressRevisions());
  const addressAutoFilled = useRef(freshAddressFlags());
  const addressManualAfterAuto = useRef(freshAddressFlags());
  const usesRealDataCrazy = crmMode === "datacrazy";

  useEffect(() => {
    clientRef.current = client;
  }, [client]);

  useEffect(() => {
    if (previousMode.current === crmMode) return;
    previousMode.current = crmMode;
    setAccepted(false);
    setError(
      "O modo de envio mudou. Confira as condições e confirme novamente antes de enviar.",
    );
  }, [crmMode]);

  const update = (key: keyof Client, value: string) => {
    if (addressFields.includes(key as AddressField)) {
      const field = key as AddressField;
      addressRevisions.current[field] += 1;
      if (addressAutoFilled.current[field])
        addressManualAfterAuto.current[field] = true;
    }
    setClient((current) => {
      const next = { ...current, [key]: value };
      clientRef.current = next;
      return next;
    });
  };

  const showFieldError = (field: CustomerField): string | undefined => {
    const currentStep = step === 0 || step === 1 ? step : null;
    if (
      !touched[field] &&
      !(currentStep !== null && attemptedSteps[currentStep])
    )
      return undefined;
    return getCustomerFieldError(field, client) || undefined;
  };

  const touch = (field: CustomerField) =>
    setTouched((current) => ({ ...current, [field]: true }));

  const cancelCepLookup = () => {
    cepRequestId.current += 1;
    cepAbortRef.current?.abort();
    cepAbortRef.current = null;
  };

  const updateCep = (value: string) => {
    const nextCep = formatCep(value);
    const previousCep = cepDigits(clientRef.current.cep);
    const normalizedNextCep = cepDigits(nextCep);
    if (previousCep !== normalizedNextCep) {
      cancelCepLookup();
      setCepStatus("idle");
      setCepNotice("");
      setCepLookupTrigger((current) => current + 1);
    }
    update("cep", nextCep);
  };

  useEffect(() => {
    if (step !== 1) {
      cancelCepLookup();
      setCepStatus((current) => (current === "loading" ? "idle" : current));
      return;
    }
    if (!cepLookupTrigger || cepLastHandledTrigger.current === cepLookupTrigger)
      return;
    cepLastHandledTrigger.current = cepLookupTrigger;

    const cep = cepDigits(clientRef.current.cep);
    if (!isExactCep(cep)) return;

    const requestId = cepRequestId.current;
    const requestRevisions = { ...addressRevisions.current };
    const applyResult = (result: CepLookupResult) => {
      if (
        requestId !== cepRequestId.current ||
        cepDigits(clientRef.current.cep) !== cep
      )
        return;
      if (result.status === "found") {
        const missingStreetOrDistrict =
          !result.address.street || !result.address.district;
        setClient((current) => {
          if (cepDigits(current.cep) !== cep) return current;
          const next = { ...current };
          addressFields.forEach((field) => {
            const providerValue = result.address[field];
            const editedDuringRequest =
              addressRevisions.current[field] !== requestRevisions[field];
            if (
              !providerValue ||
              editedDuringRequest ||
              addressRevisions.current[field] > 0 ||
              addressManualAfterAuto.current[field]
            )
              return;
            next[field] = providerValue;
            addressAutoFilled.current[field] = true;
          });
          clientRef.current = next;
          return next;
        });
        setCepStatus("found");
        setCepNotice(
          missingStreetOrDistrict
            ? "CEP encontrado. Complete os campos que faltam no endereço."
            : "Endereço preenchido com base no CEP. Confira os dados.",
        );
        return;
      }
      if (result.status === "not-found") {
        setCepStatus("not-found");
        setCepNotice("CEP não encontrado. Complete o endereço manualmente.");
        return;
      }
      if (result.status === "invalid" || result.status === "aborted") return;
      setCepStatus("error");
      setCepNotice(
        result.status === "timeout"
          ? "A consulta do CEP demorou mais que o esperado. Você pode completar o endereço manualmente."
          : "Não foi possível consultar o CEP. Você pode completar o endereço manualmente.",
      );
    };

    const cached = cepCache.current.get(cep);
    if (cached) {
      applyResult(cached);
      return;
    }

    const controller = new AbortController();
    cepAbortRef.current = controller;
    setCepStatus("loading");
    setCepNotice("Consultando CEP…");
    const debounce = window.setTimeout(() => {
      void lookupCep(cep, { signal: controller.signal }).then((result) => {
        if (result.status === "found" || result.status === "not-found")
          cepCache.current.set(cep, result);
        applyResult(result);
      });
    }, 400);

    return () => {
      window.clearTimeout(debounce);
      controller.abort();
      if (cepAbortRef.current === controller) cepAbortRef.current = null;
    };
  }, [cepLookupTrigger, step]);

  useEffect(() => () => cancelCepLookup(), []);

  const markStepAttempted = (
    targetStep: CustomerStep,
    errors: CustomerValidationErrors,
  ) => {
    setAttemptedSteps((current) => ({ ...current, [targetStep]: true }));
    setTouched((current) => ({
      ...current,
      ...customerFieldsForStep(targetStep).reduce<
        Partial<Record<CustomerField, boolean>>
      >((next, field) => {
        if (errors[field]) next[field] = true;
        return next;
      }, {}),
    }));
  };

  const moveToInvalidStep = (errors: CustomerValidationErrors) => {
    const invalidStep = firstInvalidCustomerStep(errors);
    if (invalidStep === null) return false;
    markStepAttempted(invalidStep, errors);
    setStep(invalidStep);
    setError("Revise os campos destacados antes de continuar.");
    window.scrollTo({ top: 0, behavior: "smooth" });
    return true;
  };

  const next = async (event: FormEvent) => {
    event.preventDefault();
    if (submitLock.current || done) return;
    setError("");
    const normalized = normalizeClient(clientRef.current);
    setClient(normalized);
    clientRef.current = normalized;

    if (step === 0 || step === 1) {
      const validationErrors = validateCustomerStep(step, normalized);
      markStepAttempted(step, validationErrors);
      if (Object.keys(validationErrors).length) {
        setError("Revise os campos destacados antes de continuar.");
        return;
      }
      setStep((current) => current + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    const validationErrors = validateCustomer(normalized);
    if (moveToInvalidStep(validationErrors)) return;
    if (!accepted) {
      setError(
        "Marque a confirmação dos dados e do combinado antes de enviar.",
      );
      return;
    }

    let key: string | null;
    try {
      key = attempt.current.begin(
        JSON.stringify({ customer: normalized, accepted: true }),
      );
    } catch (caught) {
      setError(
        caught instanceof Error
          ? caught.message
          : "Confira o resultado com a equipe.",
      );
      return;
    }
    if (!key) return;
    submitLock.current = true;
    cancelCepLookup();
    setSubmitting(true);
    try {
      const result = await onSubmit(normalized, key);
      setReference(result.reference);
      setRevision(result.revision);
      attempt.current.succeed();
      clientRef.current = { ...emptyClient };
      setClient({ ...emptyClient });
      cepCache.current.clear();
      setAccepted(false);
      setDone(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (caught) {
      attempt.current.fail(errorStatus(caught));
      setLocked(!attempt.current.canEdit());
      setError(safeError(caught));
    } finally {
      submitLock.current = false;
      setSubmitting(false);
    }
  };

  const retryCep = () => {
    if (!isExactCep(clientRef.current.cep)) return;
    cancelCepLookup();
    setCepStatus("idle");
    setCepNotice("");
    setCepLookupTrigger((current) => current + 1);
  };

  const modeNotice = (
    <div className="cf-note" role="note">
      <ShieldCheck size={18} />
      <p>Este cadastro não é uma assinatura nem um pagamento.</p>
    </div>
  );
  const normalizedReview = normalizeClient(client);

  return (
    <div className="cf-client-shell">
      <header className="cf-client-header">
        <Brand />
        <span className="cf-secure">
          <LockKeyhole size={14} /> Cadastro da sua compra
        </span>
      </header>
      {sale.revoked ? (
        <main className="cf-expired">
          <ShieldCheck size={36} />
          <h1>Este link foi encerrado.</h1>
          <p>Peça ao seu vendedor um novo link para concluir o cadastro.</p>
        </main>
      ) : done ? (
        <main className="cf-customer-success">
          <span className="cf-success-icon">
            <CheckCircle2 size={40} />
          </span>
          <Badge tone="green">Cadastro enviado</Badge>
          <h1>Recebemos seu cadastro.</h1>
          <p>
            Nossa equipe vai conferir os dados e orientar você sobre o contrato
            e os próximos passos.
          </p>
          <div className="cf-success-steps">
            <div>
              <Check size={18} />
              <span>Cadastro recebido</span>
            </div>
            <div>
              <ClipboardCheck size={18} />
              <span>A equipe confere os dados e prepara o contrato</span>
            </div>
            <div>
              <LockKeyhole size={18} />
              <span>Assinatura e pagamento são orientados pela equipe</span>
            </div>
          </div>
          <div className="cf-note">
            <p>
              Para sua privacidade, esta página não mostra nem recupera os dados
              cadastrais depois do envio.
            </p>
          </div>
          <small>
            Referência {reference} · versão {revision}
          </small>
        </main>
      ) : (
        <main className="cf-client-main">
          <div className="cf-client-intro">
            <span className="cf-eyebrow">SEU CADASTRO COM A COMPREFI</span>
            <h1>Complete seu cadastro.</h1>
            <p>
              Confira sua compra e preencha os dados do titular. É rápido e sem
              cobrança nesta etapa.
            </p>
          </div>
          {modeNotice}
          <div className="cf-client-grid">
            <div>
              <div className="cf-stepper">
                {[
                  { label: "Seus dados", icon: UserRound },
                  { label: "Seu endereço", icon: MapPin },
                  { label: "Confira e envie", icon: ClipboardCheck },
                ].map((current, index) => (
                  <div
                    key={current.label}
                    className={index <= step ? "is-active" : ""}
                  >
                    <span>
                      {index < step ? (
                        <Check size={15} />
                      ) : (
                        <current.icon size={16} />
                      )}
                    </span>
                    <b>{current.label}</b>
                  </div>
                ))}
              </div>
              <form
                onSubmit={next}
                noValidate
                autoComplete="off"
                aria-busy={submitting}
                className="cf-client-form"
              >
                <fieldset
                  disabled={submitting || locked}
                  className="cf-form-fieldset"
                >
                  {step === 0 && (
                    <Panel
                      title="Seus dados"
                      subtitle="Preencha como aparece no documento do titular da compra."
                    >
                      <div className="cf-fields">
                        <Field
                          wide
                          label="Nome completo"
                          autoComplete="off"
                          required
                          maxLength={120}
                          value={client.name}
                          error={showFieldError("name")}
                          onBlur={() => touch("name")}
                          onChange={(event) =>
                            update("name", event.target.value)
                          }
                          placeholder="Como aparece no seu documento"
                        />
                        <Field
                          label="CPF"
                          hint="Conferimos os dígitos do CPF. Isso não verifica a identidade do titular."
                          inputMode="numeric"
                          required
                          maxLength={14}
                          value={formatCpf(client.cpf)}
                          error={showFieldError("cpf")}
                          onBlur={() => touch("cpf")}
                          onChange={(event) =>
                            update("cpf", formatCpf(event.target.value))
                          }
                          placeholder="000.000.000-00"
                        />
                        <Field
                          label="Data de nascimento"
                          type="date"
                          autoComplete="off"
                          required
                          value={client.birth}
                          error={showFieldError("birth")}
                          onBlur={() => touch("birth")}
                          onChange={(event) =>
                            update("birth", event.target.value)
                          }
                        />
                        <Field
                          label="Celular"
                          type="tel"
                          autoComplete="off"
                          required
                          value={client.phone}
                          error={showFieldError("phone")}
                          onBlur={() => touch("phone")}
                          onChange={(event) =>
                            update("phone", event.target.value)
                          }
                          hint="Pode ser diferente do WhatsApp do atendimento."
                        />
                        <Field
                          label="E-mail"
                          type="email"
                          autoComplete="off"
                          required
                          maxLength={254}
                          value={client.email}
                          error={showFieldError("email")}
                          onBlur={() => {
                            touch("email");
                            update("email", clientRef.current.email.trim());
                          }}
                          onChange={(event) =>
                            update("email", event.target.value)
                          }
                          placeholder="Seu e-mail"
                        />
                        <Field
                          wide
                          label="Instagram (opcional)"
                          maxLength={100}
                          value={client.instagram}
                          onChange={(event) =>
                            update("instagram", event.target.value)
                          }
                          placeholder="@seuusuario"
                        />
                      </div>
                      <p className="cf-help">
                        O WhatsApp do atendimento continua sendo o informado
                        pelo seu vendedor.
                      </p>
                    </Panel>
                  )}
                  {step === 1 && (
                    <Panel
                      title="Seu endereço"
                      subtitle="Informe o endereço do titular. Se a entrega for em outro local, avise seu vendedor."
                    >
                      <div className="cf-fields">
                        <Field
                          label="CEP"
                          autoComplete="off"
                          inputMode="numeric"
                          required
                          maxLength={9}
                          value={formatCep(client.cep)}
                          error={showFieldError("cep")}
                          onBlur={() => touch("cep")}
                          onChange={(event) => updateCep(event.target.value)}
                          placeholder="00000-000"
                          hint="Ao informar 8 dígitos, consultamos somente o CEP para sugerir o endereço."
                        />
                        <Field
                          label="Endereço / rua"
                          required
                          autoComplete="off"
                          maxLength={120}
                          value={client.street}
                          error={showFieldError("street")}
                          onBlur={() => touch("street")}
                          onChange={(event) =>
                            update("street", event.target.value)
                          }
                        />
                        <Field
                          label="Número ou S/N"
                          required
                          maxLength={20}
                          value={client.number}
                          error={showFieldError("number")}
                          onBlur={() => touch("number")}
                          onChange={(event) =>
                            update("number", event.target.value)
                          }
                        />
                        <Field
                          label="Complemento (opcional)"
                          autoComplete="off"
                          maxLength={100}
                          value={client.complement}
                          onChange={(event) =>
                            update("complement", event.target.value)
                          }
                        />
                        <Field
                          label="Bairro"
                          required
                          maxLength={100}
                          value={client.district}
                          error={showFieldError("district")}
                          onBlur={() => touch("district")}
                          onChange={(event) =>
                            update("district", event.target.value)
                          }
                        />
                        <Field
                          label="Cidade"
                          required
                          autoComplete="off"
                          maxLength={100}
                          value={client.city}
                          error={showFieldError("city")}
                          onBlur={() => touch("city")}
                          onChange={(event) =>
                            update("city", event.target.value)
                          }
                        />
                        <Select
                          label="Estado"
                          required
                          value={client.state}
                          error={showFieldError("state")}
                          onBlur={() => touch("state")}
                          onChange={(event) =>
                            update("state", event.target.value)
                          }
                        >
                          <option value="">Selecione</option>
                          {"AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO"
                            .split(" ")
                            .map((uf) => (
                              <option key={uf}>{uf}</option>
                            ))}
                        </Select>
                      </div>
                      {cepNotice && (
                        <div
                          className={`cf-cep-status is-${cepStatus}`}
                          role={
                            cepStatus === "error" || cepStatus === "not-found"
                              ? "alert"
                              : "status"
                          }
                        >
                          <span>{cepNotice}</span>
                          {cepStatus === "error" && (
                            <button type="button" onClick={retryCep}>
                              <RefreshCw size={13} /> Consultar CEP novamente
                            </button>
                          )}
                        </div>
                      )}
                    </Panel>
                  )}
                  {step === 2 && (
                    <Panel
                      title="Confira e envie"
                      subtitle="Confira seus dados e o combinado antes de enviar."
                    >
                      <dl className="cf-review">
                        <div>
                          <dt>Titular</dt>
                          <dd>{normalizedReview.name}</dd>
                        </div>
                        <div>
                          <dt>CPF</dt>
                          <dd>{normalizedReview.cpf}</dd>
                        </div>
                        <div>
                          <dt>Contato</dt>
                          <dd>
                            {normalizedReview.phone}
                            <br />
                            {normalizedReview.email}
                          </dd>
                        </div>
                        <div>
                          <dt>Endereço</dt>
                          <dd>
                            {normalizedReview.street}, {normalizedReview.number}
                            {normalizedReview.complement &&
                              ` · ${normalizedReview.complement}`}
                            <br />
                            {normalizedReview.district} ·{" "}
                            {normalizedReview.city}/{normalizedReview.state}
                            <br />
                            CEP {normalizedReview.cep}
                          </dd>
                        </div>
                      </dl>
                      <div className="cf-note">
                        <ShieldCheck size={19} />
                        <p>
                          A equipe usará estes dados para seu cadastro e
                          contrato. Assinatura e pagamento acontecem depois, com
                          nossa orientação.
                        </p>
                      </div>
                      <label className="cf-check cf-space-top">
                        <input
                          type="checkbox"
                          checked={accepted}
                          onChange={(event) =>
                            setAccepted(event.target.checked)
                          }
                          required
                        />
                        <span>
                          Conferi meus dados e o combinado da minha compra. Sei que
                          este envio não é assinatura nem pagamento.
                          {usesRealDataCrazy &&
                            " Autorizo o envio dos dados à equipe para cadastro e atendimento."}
                        </span>
                      </label>
                    </Panel>
                  )}
                </fieldset>
                {locked && (
                  <p className="cf-note">
                    Resultado não confirmado. Repita o mesmo envio sem alterar o
                    cadastro ou procure a equipe. Os campos estão bloqueados
                    para evitar duplicidade.
                  </p>
                )}
                {error && (
                  <p className="cf-error" role="alert">
                    {error}
                  </p>
                )}
                <div className="cf-form-actions">
                  {step > 0 ? (
                    <Button
                      secondary
                      onClick={() => {
                        setStep((current) => current - 1);
                        setError("");
                      }}
                      disabled={submitting || locked}
                    >
                      <ArrowLeft size={16} /> Voltar
                    </Button>
                  ) : (
                    <span className="cf-private">
                      <LockKeyhole size={13} /> Sem cobrança nesta etapa
                    </span>
                  )}
                  <Button type="submit" disabled={submitting}>
                    {step === 2
                      ? submitting
                        ? "Enviando cadastro…"
                        : "Enviar cadastro"
                      : "Continuar"}
                    <ArrowRight size={17} />
                  </Button>
                </div>
              </form>
            </div>
            <aside className="cf-sticky">
              <Summary sale={sale} showImages={false} />
              <div className="cf-after">
                <span>O QUE ACONTECE DEPOIS?</span>
                <p>
                  <b>01</b> A equipe confere seu cadastro.
                </p>
                <p>
                  <b>02</b> Seu contrato é preparado.
                </p>
                <p>
                  <b>03</b> Você recebe as orientações de assinatura.
                </p>
              </div>
            </aside>
          </div>
        </main>
      )}
      <footer className="cf-client-footer">
        <span>CompreFi · Seu setup Apple com tranquilidade.</span>
        <span>Sem cobrança nesta etapa</span>
      </footer>
    </div>
  );
}

import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  LockKeyhole,
  UserRound,
  MapPin,
  ClipboardCheck,
  ShieldCheck,
} from "lucide-react";
import { Badge, Brand, Button, Field, Panel, Select, Summary } from "./ui";
import {
  demoClient,
  emptyClient,
  validCpf,
  digits,
  type Sale,
  type Client,
} from "./model";

export default function CustomerForm({
  sale,
  onSubmit,
  onAdmin,
}: {
  sale: Sale;
  onSubmit: (customer: Client) => void;
  onAdmin: () => void;
}) {
  const [client, setClient] = useState<Client>(
    sale.customer || { ...emptyClient, phone: sale.whatsapp }
  );
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState(false);
  const [done, setDone] = useState(Boolean(sale.customer));
  const [error, setError] = useState("");
  const update = (key: keyof Client, value: string) =>
    setClient(c => ({ ...c, [key]: value }));
  const next = (event: FormEvent) => {
    event.preventDefault();
    setError("");
    if (step === 0) {
      if (client.name.trim().split(/\s+/).length < 2) {
        setError("Informe seu nome completo.");
        return;
      }
      if (!validCpf(client.cpf)) {
        setError("Confira o CPF: os dígitos informados não são válidos.");
        return;
      }
      if (digits(client.phone).length !== 11) {
        setError("Informe um celular com DDD e 11 dígitos.");
        return;
      }
      if (
        !client.birth ||
        client.birth >= new Date().toISOString().slice(0, 10)
      ) {
        setError("Confira a data de nascimento.");
        return;
      }
    }
    if (step === 1 && digits(client.cep).length !== 8) {
      setError("Informe um CEP com 8 dígitos.");
      return;
    }
    if (step < 2) {
      setStep(step + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!accepted) {
      setError(
        "Confirme a conferência dos dados e condições para simular o envio."
      );
      return;
    }
    onSubmit({ ...client });
    setDone(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const fill = () => {
    setClient({ ...demoClient });
    setError("");
  };
  return (
    <div className="cf-client-shell">
      <header className="cf-client-header">
        <Brand />
        <span className="cf-secure">
          <LockKeyhole size={14} /> Ficha de cadastro
        </span>
      </header>
      {sale.revoked ? (
        <main className="cf-expired">
          <ShieldCheck size={36} />
          <h1>Este link foi encerrado.</h1>
          <p>Peça ao seu vendedor um novo link para concluir o cadastro.</p>
          <Button secondary onClick={onAdmin}>
            Voltar à prévia do admin
          </Button>
        </main>
      ) : done ? (
        <main className="cf-customer-success">
          <span className="cf-success-icon">
            <CheckCircle2 size={40} />
          </span>
          <Badge tone="green">Simulação concluída</Badge>
          <h1>
            Tudo certo com
            <br />o seu cadastro.
          </h1>
          <p>
            Na versão final, esses dados atualizam seu atendimento e permitem
            preparar o contrato da sua compra.
          </p>
          <div className="cf-success-steps">
            <div>
              <Check size={18} />
              <span>Cadastro recebido nesta prévia</span>
            </div>
            <div>
              <Check size={18} />
              <span>Contrato demonstrativo disponível no admin</span>
            </div>
            <div>
              <LockKeyhole size={18} />
              <span>Assinaturas e pagamento continuam com a equipe</span>
            </div>
          </div>
          <div className="cf-note">
            <p>
              Este teste não enviou dados ao DataCrazy, não gerou cobrança e não
              assinou nenhum documento.
            </p>
          </div>
          <Button onClick={onAdmin}>
            Conferir ficha no admin <ArrowRight size={17} />
          </Button>
          <small>Referência {sale.reference} · versão 1</small>
        </main>
      ) : (
        <main className="cf-client-main">
          <div className="cf-client-intro">
            <span className="cf-eyebrow">O COMBINADO JÁ ESTÁ AQUI</span>
            <h1>
              Seu novo iPhone
              <br />
              <span>está quase aí.</span>
            </h1>
            <p>
              Confira a negociação e complete seu cadastro.
              <br className="cf-desktop" /> A gente cuida dos próximos passos
              com você.
            </p>
          </div>
          <div className="cf-client-grid">
            <div>
              <div className="cf-stepper">
                {[
                  { label: "Seus dados", icon: UserRound },
                  { label: "Endereço", icon: MapPin },
                  { label: "Conferência", icon: ClipboardCheck },
                ].map((s, i) => (
                  <div key={s.label} className={i <= step ? "is-active" : ""}>
                    <span>
                      {i < step ? <Check size={15} /> : <s.icon size={16} />}
                    </span>
                    <b>{s.label}</b>
                  </div>
                ))}
              </div>
              <form onSubmit={next} className="cf-client-form">
                {step === 0 && (
                  <Panel
                    title="Vamos começar por você."
                    subtitle="Use os dados da pessoa que será titular da compra."
                  >
                    <div className="cf-fields">
                      <Field
                        wide
                        label="Nome completo"
                        autoComplete="name"
                        required
                        value={client.name}
                        onChange={e => update("name", e.target.value)}
                        placeholder="Como aparece no seu documento"
                      />
                      <Field
                        label="CPF"
                        inputMode="numeric"
                        required
                        maxLength={14}
                        value={client.cpf}
                        onChange={e => update("cpf", e.target.value)}
                        placeholder="000.000.000-00"
                      />
                      <Field
                        label="Data de nascimento"
                        type="date"
                        autoComplete="bday"
                        required
                        value={client.birth}
                        onChange={e => update("birth", e.target.value)}
                      />
                      <Field
                        label="Celular"
                        type="tel"
                        autoComplete="tel-national"
                        required
                        value={client.phone}
                        onChange={e => update("phone", e.target.value)}
                        hint="Pode ser diferente do WhatsApp do atendimento."
                      />
                      <Field
                        label="E-mail"
                        type="email"
                        autoComplete="email"
                        required
                        value={client.email}
                        onChange={e => update("email", e.target.value)}
                        placeholder="voce@exemplo.com"
                      />
                      <Field
                        wide
                        label="Instagram (opcional)"
                        value={client.instagram}
                        onChange={e => update("instagram", e.target.value)}
                        placeholder="@seuusuario"
                      />
                    </div>
                    <p className="cf-help">
                      O WhatsApp do atendimento continua sendo o informado pelo
                      seu vendedor.
                    </p>
                  </Panel>
                )}
                {step === 1 && (
                  <Panel
                    title="Onde você está?"
                    subtitle="Endereço cadastral do titular. Confira com seu vendedor se a entrega será em outro local."
                  >
                    <div className="cf-fields">
                      <Field
                        label="CEP"
                        autoComplete="postal-code"
                        inputMode="numeric"
                        required
                        value={client.cep}
                        onChange={e => update("cep", e.target.value)}
                        placeholder="00000-000"
                        hint="Nesta prévia, o endereço é preenchido manualmente."
                      />
                      <Field
                        label="Endereço / rua"
                        required
                        autoComplete="address-line1"
                        value={client.street}
                        onChange={e => update("street", e.target.value)}
                      />
                      <Field
                        label="Número ou S/N"
                        required
                        value={client.number}
                        onChange={e => update("number", e.target.value)}
                      />
                      <Field
                        label="Complemento (opcional)"
                        autoComplete="address-line2"
                        value={client.complement}
                        onChange={e => update("complement", e.target.value)}
                      />
                      <Field
                        label="Bairro"
                        required
                        value={client.district}
                        onChange={e => update("district", e.target.value)}
                      />
                      <Field
                        label="Cidade"
                        required
                        autoComplete="address-level2"
                        value={client.city}
                        onChange={e => update("city", e.target.value)}
                      />
                      <Select
                        label="Estado"
                        required
                        autoComplete="address-level1"
                        value={client.state}
                        onChange={e => update("state", e.target.value)}
                      >
                        <option value="">Selecione</option>
                        {"AC AL AP AM BA CE DF ES GO MA MT MS MG PA PB PR PE PI RJ RN RS RO RR SC SP SE TO"
                          .split(" ")
                          .map(uf => (
                            <option key={uf}>{uf}</option>
                          ))}
                      </Select>
                    </div>
                  </Panel>
                )}
                {step === 2 && (
                  <Panel
                    title="Só mais uma conferência."
                    subtitle="Você está enviando um cadastro, não realizando uma assinatura ou pagamento."
                  >
                    <dl className="cf-review">
                      <div>
                        <dt>Titular</dt>
                        <dd>{client.name}</dd>
                      </div>
                      <div>
                        <dt>CPF</dt>
                        <dd>{client.cpf}</dd>
                      </div>
                      <div>
                        <dt>Contato</dt>
                        <dd>
                          {client.phone}
                          <br />
                          {client.email}
                        </dd>
                      </div>
                      <div>
                        <dt>Endereço</dt>
                        <dd>
                          {client.street}, {client.number}
                          {client.complement && ` · ${client.complement}`}
                          <br />
                          {client.district} · {client.city}/{client.state}
                          <br />
                          CEP {client.cep}
                        </dd>
                      </div>
                    </dl>
                    <div className="cf-note">
                      <ShieldCheck size={19} />
                      <p>
                        Na V1, os dados serão usados no cadastro da compra, no
                        atendimento pelo DataCrazy e na preparação do contrato.
                        Nesta prévia, ficam só na memória da página.
                      </p>
                    </div>
                    <label className="cf-check cf-space-top">
                      <input
                        type="checkbox"
                        checked={accepted}
                        onChange={e => setAccepted(e.target.checked)}
                        required
                      />
                      <span>
                        Conferi meus dados e a condição negociada exibida nesta
                        ficha. Entendo que a assinatura do contrato e o
                        pagamento acontecerão depois, com a equipe.
                      </span>
                    </label>
                  </Panel>
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
                        setStep(step - 1);
                        setError("");
                      }}
                    >
                      {" "}
                      <ArrowLeft size={16} /> Voltar
                    </Button>
                  ) : (
                    <span className="cf-private">
                      <LockKeyhole size={13} /> Sem cobrança nesta etapa
                    </span>
                  )}
                  <Button type="submit">
                    {step === 2 ? "Simular envio do cadastro" : "Continuar"}
                    <ArrowRight size={17} />
                  </Button>
                </div>
              </form>
              <div className="cf-demo-helper">
                <span>TESTE SEM DADOS REAIS</span>
                <button onClick={fill}>Preencher com exemplo fictício</button>
              </div>
            </div>
            <aside className="cf-sticky">
              <Summary sale={sale} />
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
        <span>Prévia de experiência · sem valor contratual</span>
      </footer>
    </div>
  );
}

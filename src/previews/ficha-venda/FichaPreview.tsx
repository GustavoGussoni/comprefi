import { useEffect, useState } from "react";
import {
  ArrowLeftRight,
  ArrowRight,
  Bell,
  Calculator,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardList,
  Copy,
  CreditCard,
  Download,
  ExternalLink,
  FileText,
  LayoutDashboard,
  Link2,
  Menu,
  MoreHorizontal,
  Package,
  Plus,
  Search,
  ShieldCheck,
  UserRoundSearch,
  X,
} from "lucide-react";
import SaleEditor from "./SaleEditor";
import CustomerForm from "./CustomerForm";
import { Badge, Brand, Button, Summary } from "./ui";
import { initialSales, money, total, type Sale, type Client } from "./model";
import { downloadDemoPdf } from "./demoPdf";
import "./preview.css";

type Route = { view: "list" | "new" | "client"; id?: string };
const parseRoute = (): Route => {
  const [view, id] = window.location.hash.replace(/^#\/?/, "").split("/");
  return {
    view: view === "cliente" ? "client" : view === "nova" ? "new" : "list",
    id,
  };
};
export default function FichaPreview() {
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [route, setRoute] = useState<Route>(parseRoute);
  const [selected, setSelected] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("all");
  const [notice, setNotice] = useState("");
  const [menu, setMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const fn = () => {
      setRoute(parseRoute());
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", fn);
    return () => window.removeEventListener("hashchange", fn);
  }, []);
  useEffect(() => {
    if (!selected && !menu) return;
    const fn = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSelected(null);
        setMenu(false);
      }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [selected, menu]);
  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(""), 6000);
    return () => window.clearTimeout(timer);
  }, [notice]);
  const navigate = (hash = "") => {
    window.location.hash = hash;
    setMenu(false);
  };
  const change = (id: string, changes: Partial<Sale>) =>
    setSales(list => list.map(s => (s.id === id ? { ...s, ...changes } : s)));
  const picked = sales.find(s => s.id === selected);
  const clientSale = sales.find(s => s.id === route.id);
  const notify = (message: string) => setNotice(message);
  const create = (sale: Sale) => {
    setSales(list => [sale, ...list]);
    navigate("");
    setSelected(sale.id);
    notify("Link demonstrativo criado. Nenhum cliente foi contatado.");
  };
  const submit = (client: Client) => {
    if (clientSale)
      change(clientSale.id, {
        customer: client,
        crm: "simulated",
        pdf: "ready",
      });
  };
  const showClient = (id: string) => {
    setSelected(null);
    navigate(`cliente/${id}`);
  };
  const copyLink = async (sale: Sale) => {
    try {
      await navigator.clipboard.writeText(
        `${location.origin}${location.pathname}#cliente/${sale.id}`
      );
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
      notify(
        "Link demonstrativo copiado. Fichas novas só funcionam nesta aba; não envie a clientes reais."
      );
    } catch {
      notify(
        "O navegador bloqueou a cópia. Use o botão Abrir visão do cliente."
      );
    }
  };
  const matches = sales.filter(
    s =>
      (!query ||
        `${s.reference} ${s.product} ${s.customer?.name || ""}`
          .toLowerCase()
          .includes(query.toLowerCase())) &&
      (filter === "all" || (filter === "pending" ? !s.customer : !!s.customer))
  );
  const stats = [
    {
      label: "Fichas criadas",
      value: sales.length,
      hint: "Somente exemplos desta sessão",
      icon: ClipboardList,
    },
    {
      label: "Aguardando cadastro",
      value: sales.filter(s => !s.customer && !s.revoked).length,
      hint: "Próximo passo com o cliente",
      icon: UserRoundSearch,
    },
    {
      label: "Contratos disponíveis",
      value: sales.filter(s => s.pdf === "ready").length,
      hint: "Demonstrativos · não assinados",
      icon: FileText,
    },
  ];
  return (
    <div className="cf-preview">
      <div className="cf-demo-bar">
        <span>
          <span className="cf-live-dot" />
          PRÉVIA INTERATIVA
        </span>
        <p>
          Use apenas dados fictícios. Sem envio ao CRM, assinatura ou cobrança.
        </p>
        <button
          onClick={() => {
            setSelected(null);
            navigate(route.view === "client" ? "" : "cliente/exemplo");
          }}
        >
          {route.view === "client" ? "Ver admin" : "Ver cliente"}{" "}
          <ArrowRight size={13} />
        </button>
      </div>
      {route.view === "client" ? (
        clientSale ? (
          <CustomerForm
            key={clientSale.id}
            sale={clientSale}
            onSubmit={submit}
            onAdmin={() => {
              navigate("");
              setSelected(clientSale.id);
            }}
          />
        ) : (
          <div className="cf-expired">
            <Brand />
            <h1>Esta ficha não está nesta sessão.</h1>
            <p>
              Os dados desta prévia ficam só na memória da aba e são apagados ao
              recarregar. Este não é um link de cadastro real.
            </p>
            <Button onClick={() => navigate("cliente/exemplo")}>
              Abrir exemplo demonstrativo
            </Button>
            <Button secondary onClick={() => navigate("")}>
              Voltar ao admin
            </Button>
          </div>
        )
      ) : (
        <>
          {menu && (
            <button
              className="cf-mobile-overlay"
              aria-label="Fechar navegação"
              onClick={() => setMenu(false)}
            />
          )}
          <aside className={`cf-sidebar ${menu ? "cf-sidebar-open" : ""}`}>
            <div className="cf-sidebar-brand">
              <Brand />
              <button
                className="cf-mobile-only cf-icon-button"
                onClick={() => setMenu(false)}
                aria-label="Fechar menu"
              >
                <X size={20} />
              </button>
            </div>
            <div className="cf-sidebar-content">
              <span className="cf-nav-label">OPERAÇÃO</span>
              <nav>
                {[
                  { label: "Visão geral", icon: LayoutDashboard },
                  { label: "Simulações e CRM", icon: UserRoundSearch },
                  { label: "Fichas de venda", icon: ClipboardList },
                  { label: "Catálogo", icon: Package },
                  { label: "Valores de troca", icon: ArrowLeftRight },
                ].map(item => (
                  <button
                    key={item.label}
                    className={
                      item.label === "Fichas de venda" ? "is-active" : ""
                    }
                    onClick={() =>
                      item.label === "Fichas de venda"
                        ? navigate("")
                        : notify(
                            "Esta área continua no admin atual. A prévia demonstra apenas as fichas de venda."
                          )
                    }
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                    {item.label === "Fichas de venda" && <small>NOVO</small>}
                  </button>
                ))}
              </nav>
              <span className="cf-nav-label">FERRAMENTAS</span>
              <nav>
                {[
                  { label: "Calculadora de preços", icon: Calculator },
                  { label: "Simulador de taxas", icon: CreditCard },
                ].map(item => (
                  <button
                    key={item.label}
                    onClick={() =>
                      notify(
                        "Ferramenta preservada no admin atual; fora do escopo desta prévia."
                      )
                    }
                  >
                    <item.icon size={18} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
              <div className="cf-sidebar-tip">
                <ShieldCheck size={20} />
                <strong>Uma ficha. Um combinado.</strong>
                <p>
                  O comercial fica registrado. O cliente completa o cadastro sem
                  refazer a negociação.
                </p>
              </div>
            </div>
            <div className="cf-sidebar-user">
              <span className="cf-avatar">IA</span>
              <div>
                <strong>Iago</strong>
                <small>Vendedor · prévia</small>
              </div>
              <MoreHorizontal size={18} />
            </div>
          </aside>
          <div className="cf-admin-shell">
            <header className="cf-admin-header">
              <div>
                <button
                  className="cf-mobile-only cf-icon-button"
                  aria-label="Abrir navegação"
                  onClick={() => setMenu(true)}
                >
                  <Menu size={20} />
                </button>
                <span className="cf-breadcrumb">
                  Admin <ChevronRight size={13} />{" "}
                  <strong>Fichas de venda</strong>
                </span>
              </div>
              <div>
                <span className="cf-header-preview">
                  Ambiente de demonstração
                </span>
                <button
                  className="cf-icon-button"
                  aria-label="Notificações da prévia"
                  onClick={() =>
                    notify("Nenhuma notificação real é acessada nesta prévia.")
                  }
                >
                  <Bell size={18} />
                </button>
                <span className="cf-avatar cf-avatar-small">IA</span>
              </div>
            </header>
            <main className="cf-admin-main">
              {route.view === "new" ? (
                <SaleEditor onCancel={() => navigate("")} onSave={create} />
              ) : (
                <>
                  <div className="cf-page-heading">
                    <div>
                      <span className="cf-eyebrow">
                        DA NEGOCIAÇÃO AO CONTRATO
                      </span>
                      <h1>
                        Fichas de venda<span className="cf-heading-dot">.</span>
                      </h1>
                      <p>O combinado organizado. O cadastro no lugar certo.</p>
                    </div>
                    <Button onClick={() => navigate("nova")}>
                      <Plus size={18} /> Nova ficha
                    </Button>
                  </div>
                  <div className="cf-stats">
                    {stats.map(s => (
                      <section key={s.label}>
                        <div>
                          <span>{s.label}</span>
                          <s.icon size={19} />
                        </div>
                        <strong>{s.value.toString().padStart(2, "0")}</strong>
                        <small>{s.hint}</small>
                      </section>
                    ))}
                  </div>
                  <section className="cf-list-panel">
                    <div className="cf-list-toolbar">
                      <div className="cf-tabs">
                        {[
                          { key: "all", name: "Todas" },
                          { key: "pending", name: "Pendentes" },
                          { key: "ready", name: "Cadastro recebido" },
                        ].map(tab => (
                          <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={filter === tab.key ? "is-active" : ""}
                          >
                            {tab.name}
                          </button>
                        ))}
                      </div>
                      <label className="cf-search">
                        <Search size={16} />
                        <input
                          aria-label="Buscar ficha"
                          value={query}
                          onChange={e => setQuery(e.target.value)}
                          placeholder="Buscar ficha ou produto"
                        />
                      </label>
                    </div>
                    <div className="cf-table-wrap">
                      <table className="cf-table">
                        <thead>
                          <tr>
                            <th>FICHA / CLIENTE</th>
                            <th>NEGOCIAÇÃO</th>
                            <th>CADASTRO</th>
                            <th>CONTRATO</th>
                            <th>
                              <span className="cf-sr-only">Ações</span>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {matches.map(s => (
                            <tr key={s.id}>
                              <td>
                                <button
                                  className="cf-row-title"
                                  onClick={() => setSelected(s.id)}
                                >
                                  {s.customer?.name || "Aguardando cliente"}
                                </button>
                                <small>{s.reference} · Iago</small>
                              </td>
                              <td>
                                <strong>{s.product}</strong>
                                <small>
                                  {s.storage} · {money(total(s))}
                                  {s.hasTrade ? " de volta" : ""}
                                </small>
                              </td>
                              <td>
                                {s.revoked ? (
                                  <Badge tone="red">Link encerrado</Badge>
                                ) : s.customer ? (
                                  <Badge tone="green">Recebido</Badge>
                                ) : (
                                  <Badge tone="orange">Aguardando</Badge>
                                )}
                              </td>
                              <td>
                                {s.pdf === "ready" ? (
                                  <span className="cf-document-status">
                                    <FileText size={15} /> PDF demonstrativo
                                  </span>
                                ) : (
                                  <span className="cf-muted">
                                    Após o cadastro
                                  </span>
                                )}
                              </td>
                              <td>
                                <button
                                  className="cf-icon-button"
                                  onClick={() => setSelected(s.id)}
                                  aria-label={`Abrir ficha ${s.reference}`}
                                >
                                  <ChevronRight size={18} />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {!matches.length && (
                        <div className="cf-empty">
                          <Search size={25} />
                          <h3>Nenhuma ficha encontrada.</h3>
                          <p>Tente outro produto ou altere os filtros.</p>
                        </div>
                      )}
                    </div>
                    <div className="cf-table-footer">
                      <span>{matches.length} fichas nesta demonstração</span>
                      <span>
                        CRM e contrato têm acompanhamentos independentes
                      </span>
                    </div>
                  </section>
                  <section className="cf-flow-guide">
                    <span className="cf-flow-icon">
                      <Link2 size={24} />
                    </span>
                    <div>
                      <h2>Você registra. O cliente completa.</h2>
                      <p>
                        Crie o link depois de fechar a negociação. Quando o
                        cadastro chegar, acompanhe o CRM e baixe o contrato no
                        mesmo lugar.
                      </p>
                    </div>
                    <button onClick={() => showClient("exemplo")}>
                      Explorar visão do cliente <ArrowRight size={16} />
                    </button>
                  </section>
                  <p className="cf-admin-footnote">
                    <LockIcon /> Sem um novo pipeline de vendas: seu atendimento
                    continua no DataCrazy.
                  </p>
                </>
              )}
            </main>
          </div>
        </>
      )}
      {picked && route.view !== "client" && (
        <div className="cf-drawer-layer">
          <button
            className="cf-drawer-overlay"
            onClick={() => setSelected(null)}
            aria-label="Fechar detalhes"
          />
          <section
            className="cf-drawer"
            role="dialog"
            aria-modal="true"
            aria-label={`Detalhes da ficha ${picked.reference}`}
          >
            <header>
              <div>
                <span className="cf-eyebrow">FICHA DE VENDA · VERSÃO 1</span>
                <h2>{picked.reference}</h2>
              </div>
              <button
                autoFocus
                className="cf-icon-button"
                onClick={() => setSelected(null)}
                aria-label="Fechar painel"
              >
                <X size={21} />
              </button>
            </header>
            <div className="cf-drawer-body">
              <div className="cf-drawer-state">
                <Badge tone={picked.customer ? "green" : "orange"}>
                  {picked.customer
                    ? "Cadastro recebido"
                    : "Aguardando cadastro"}
                </Badge>
                <p>
                  {picked.customer?.name ||
                    "O cliente ainda não concluiu esta ficha."}
                </p>
              </div>
              <section className="cf-drawer-card">
                <div className="cf-card-title">
                  <Link2 size={18} />
                  <h3>Link do cliente</h3>
                </div>
                <p>
                  Individual na V1. Nesta prévia, não envie a clientes reais: os
                  dados de novas fichas existem só nesta aba.
                </p>
                <div className="cf-link-preview">
                  cadastro/
                  {picked.id === "exemplo"
                    ? "exemplo-demonstrativo"
                    : picked.id.slice(0, 12)}
                </div>
                <div className="cf-button-row">
                  <Button
                    secondary
                    disabled={picked.revoked}
                    onClick={() => copyLink(picked)}
                  >
                    {copied ? <Check size={15} /> : <Copy size={15} />}
                    {copied ? "Copiado" : "Copiar link"}
                  </Button>
                  <Button secondary onClick={() => showClient(picked.id)}>
                    Abrir visão do cliente <ExternalLink size={14} />
                  </Button>
                </div>
              </section>
              <Summary sale={picked} compact />
              <section className="cf-drawer-card">
                <div className="cf-card-title">
                  <UserRoundSearch size={18} />
                  <h3>Entrega ao DataCrazy</h3>
                </div>
                <Badge
                  tone={
                    picked.crm === "failed"
                      ? "red"
                      : picked.crm === "simulated"
                        ? "green"
                        : "neutral"
                  }
                >
                  {picked.crm === "failed"
                    ? "Falha simulada"
                    : picked.crm === "simulated"
                      ? "Concluído na simulação"
                      : "Aguardando cadastro"}
                </Badge>
                <p>
                  O atendimento é localizado pelo WhatsApp informado por Iago.
                  Nenhum webhook real é chamado nesta prévia.
                </p>
                {picked.customer && (
                  <div className="cf-inline-actions">
                    <button
                      onClick={() =>
                        change(picked.id, {
                          crm: picked.crm === "failed" ? "simulated" : "failed",
                        })
                      }
                    >
                      {picked.crm === "failed"
                        ? "Simular nova tentativa de CRM"
                        : "Testar estado de falha do CRM"}
                    </button>
                  </div>
                )}
              </section>
              <section className="cf-drawer-card">
                <div className="cf-card-title">
                  <FileText size={18} />
                  <h3>Contrato</h3>
                </div>
                <Badge tone={picked.pdf === "ready" ? "green" : "neutral"}>
                  {picked.pdf === "ready"
                    ? "Demonstrativo disponível"
                    : "Aguardando cadastro"}
                </Badge>
                <p>
                  {picked.pdf === "ready"
                    ? "PDF de revisão dos campos, ainda não assinado e sem validade contratual. A assinatura pelo gov.br permanece fora da aplicação."
                    : "O contrato fica disponível após o cliente enviar o cadastro. Uma falha do CRM não bloqueia o documento."}
                </p>
                <Button
                  disabled={picked.pdf !== "ready"}
                  onClick={() => {
                    try {
                      downloadDemoPdf(picked);
                    } catch {
                      notify("Não foi possível gerar o PDF demonstrativo.");
                    }
                  }}
                >
                  <Download size={16} /> Baixar PDF demonstrativo
                </Button>
              </section>
              {!picked.customer && (
                <button
                  className="cf-danger-link"
                  onClick={() => {
                    change(picked.id, { revoked: !picked.revoked });
                    notify(
                      picked.revoked
                        ? "Link reaberto na simulação."
                        : "Link encerrado nesta simulação."
                    );
                  }}
                >
                  {picked.revoked
                    ? "Reabrir link demonstrativo"
                    : "Encerrar link demonstrativo"}
                </button>
              )}
              <div className="cf-timeline">
                <div>
                  <CheckCircle2 size={16} />
                  <span>Ficha comercial criada por Iago</span>
                </div>
                <div>
                  {picked.customer ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <span className="cf-timeline-dot" />
                  )}
                  <span>
                    Cadastro{" "}
                    {picked.customer ? "recebido na simulação" : "pendente"}
                  </span>
                </div>
                <div>
                  <span className="cf-timeline-dot" />
                  <span>Assinaturas: acompanhamento manual</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
      {notice && (
        <div className="cf-toast" role="status">
          <InfoIcon />
          <span>{notice}</span>
          <button aria-label="Fechar aviso" onClick={() => setNotice("")}>
            <X size={15} />
          </button>
        </div>
      )}
    </div>
  );
}
function InfoIcon() {
  return <ShieldCheck size={19} />;
}
function LockIcon() {
  return <ShieldCheck size={14} />;
}

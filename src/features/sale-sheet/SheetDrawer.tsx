import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { Download, X } from "lucide-react";
import { saleSheetApi, safeError } from "./api";
import type { CrmDeliveryMode, SheetSnapshot } from "./model";
import { taskLabel } from "./taskLabel";
import { Badge, Button, Summary } from "./ui";

export default function SheetDrawer({
  sheet,
  rawToken,
  isAdmin,
  crmMode,
  onUpdate,
  onClose,
}: {
  sheet: SheetSnapshot;
  rawToken?: string;
  isAdmin: boolean;
  crmMode: CrmDeliveryMode;
  onUpdate: (sheet: SheetSnapshot, token?: string) => void;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const actionLock = useRef(false);
  const link = rawToken
    ? `${window.location.origin}/ficha-venda/${encodeURIComponent(rawToken)}`
    : "";
  const perform = async (action: () => Promise<void>) => {
    if (actionLock.current) return;
    actionLock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (caught) {
      setError(safeError(caught));
    } finally {
      actionLock.current = false;
      setBusy(false);
    }
  };
  const download = async () => {
    const blob = await saleSheetApi.download(sheet.id);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `ficha-${sheet.id}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Download do PDF completo iniciado.");
  };
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !actionLock.current) onClose();
      }}
    >
      <Dialog.Portal>
        <div className="sale-sheet cf-drawer-layer">
          <Dialog.Overlay className="cf-drawer-overlay" />
          <Dialog.Content
            className="cf-drawer"
            aria-busy={busy}
            onEscapeKeyDown={(event) => {
              if (actionLock.current) event.preventDefault();
            }}
            onPointerDownOutside={(event) => {
              if (actionLock.current) event.preventDefault();
            }}
          >
            <header>
              <div>
                <span className="cf-eyebrow">
                  FICHA DE VENDA · VERSÃO {sheet.revision}
                </span>
                <Dialog.Title>{sheet.reference}</Dialog.Title>
                <Dialog.Description className="cf-muted">
                  Detalhes privados da negociação e do cadastro.
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="cf-icon-button"
                disabled={busy}
                aria-label="Fechar detalhes"
              >
                <X size={20} />
              </Dialog.Close>
            </header>
            <div className="cf-drawer-body">
              {error && (
                <p role="alert" className="cf-error">
                  {error}
                </p>
              )}
              {notice && (
                <p role="status" className="cf-note">
                  {notice}
                </p>
              )}
              <Badge tone={sheet.submittedAt ? "green" : "orange"}>
                {sheet.submittedAt
                  ? "Cadastro recebido"
                  : "Aguardando cadastro"}
              </Badge>
              <Summary sale={sheet} showSku />
              <section className="cf-drawer-card">
                <h3>Link do cliente</h3>
                <p>
                  Válido até{" "}
                  {new Date(sheet.linkExpiresAt).toLocaleString("pt-BR")}. O
                  link bruto aparece somente ao gerar ou renovar, nunca na
                  lista.
                </p>
                {link && !sheet.revoked && !sheet.submittedAt && (
                  <>
                    <div className="cf-link-preview">{link}</div>
                    <div className="cf-button-row">
                      <Button
                        secondary
                        disabled={busy}
                        onClick={() =>
                          void perform(async () => {
                            await navigator.clipboard.writeText(link);
                            setNotice(
                              "Link copiado. Compartilhe apenas com o cliente.",
                            );
                          })
                        }
                      >
                        Copiar link
                      </Button>
                      <a
                        className="cf-button cf-button-secondary"
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        referrerPolicy="no-referrer"
                        aria-disabled={busy}
                        onClick={(event) => {
                          if (actionLock.current) event.preventDefault();
                        }}
                      >
                        Abrir ficha
                      </a>
                    </div>
                  </>
                )}
                {sheet.revoked ? (
                  <p>Link encerrado.</p>
                ) : (
                  !sheet.submittedAt && (
                    <div className="cf-button-row">
                      <Button
                        secondary
                        disabled={busy}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Renovar invalida o link anterior. Continuar?",
                            )
                          )
                            void perform(async () => {
                              const result = await saleSheetApi.rotate(
                                sheet.id,
                              );
                              onUpdate(result.sheet, result.token);
                            });
                        }}
                      >
                        Renovar link
                      </Button>
                      <Button
                        secondary
                        disabled={busy}
                        onClick={() => {
                          if (
                            window.confirm(
                              "Encerrar este link? O cliente não poderá enviar o cadastro.",
                            )
                          )
                            void perform(async () =>
                              onUpdate(await saleSheetApi.revoke(sheet.id), ""),
                            );
                        }}
                      >
                        Encerrar link
                      </Button>
                    </div>
                  )
                )}
              </section>
              {sheet.customer && (
                <section className="cf-drawer-card">
                  <h3>Cadastro recebido</h3>
                  <dl className="cf-review">
                    <div>
                      <dt>Nome</dt>
                      <dd>{sheet.customer.name}</dd>
                    </div>
                    <div>
                      <dt>CPF</dt>
                      <dd>{sheet.customer.cpf}</dd>
                    </div>
                    <div>
                      <dt>Contato</dt>
                      <dd>
                        {sheet.customer.phone}
                        <br />
                        {sheet.customer.email}
                      </dd>
                    </div>
                    <div>
                      <dt>Endereço</dt>
                      <dd>
                        {sheet.customer.street}, {sheet.customer.number}{" "}
                        {sheet.customer.complement}
                        <br />
                        {sheet.customer.district} · {sheet.customer.city}/
                        {sheet.customer.state}
                        <br />
                        {sheet.customer.cep}
                      </dd>
                    </div>
                  </dl>
                  <p>
                    CPF conferido matematicamente e e-mail por formato. Não
                    representa verificação de identidade ou titularidade.
                  </p>
                </section>
              )}
              <section className="cf-drawer-card">
                <h3>Contrato privado</h3>
                <p>
                  {taskLabel(sheet.pdf)} · {sheet.pdf.attempts} tentativa(s).
                  Assinaturas e pagamento não são realizados nesta tela.
                </p>
                <div className="cf-button-row">
                  <Button
                    disabled={busy || sheet.pdf.status !== "ready"}
                    onClick={() => void perform(download)}
                  >
                    <Download size={16} /> Baixar PDF completo
                  </Button>
                  {sheet.submittedAt &&
                    (sheet.pdf.status === "failed" ||
                      sheet.pdf.status === "waiting") && (
                      <Button
                        secondary
                        disabled={busy}
                        onClick={() =>
                          void perform(async () =>
                            onUpdate(
                              await saleSheetApi.retryContract(sheet.id),
                            ),
                          )
                        }
                      >
                        Retomar contrato pendente
                      </Button>
                    )}
                </div>
                <p>
                  Um PDF pronto não é regenerado nem substituído. Preparação
                  comercial e revisão jurídica continuam sendo pré-requisitos
                  para uso real.
                </p>
              </section>
              <section className="cf-drawer-card">
                <h3>CRM</h3>
                <p>
                  {taskLabel(sheet.crm)} · {sheet.crm.attempts} tentativa(s).
                </p>
                {crmMode === "disabled" && (
                  <p>
                    Integração CRM desativada nesta preparação. Cadastro e PDF
                    são independentes.
                  </p>
                )}
                {sheet.crm.status === "uncertain" && (
                  <p className="cf-uncertain-note">
                    Confirme o recebimento no destino antes de qualquer ação.
                    Não há reenvio automático nem garantia de negócio criado.
                  </p>
                )}
                {isAdmin && (
                  <div className="cf-button-row">
                    <Button
                      secondary
                      disabled={busy || !sheet.submittedAt}
                      onClick={() =>
                        void perform(async () => {
                          const payload = await saleSheetApi.payload(sheet.id);
                          await navigator.clipboard.writeText(
                            JSON.stringify(payload, null, 2),
                          );
                          setNotice(
                            "Payload privado copiado. Não compartilhe fora da equipe autorizada.",
                          );
                        })
                      }
                    >
                      Copiar payload CRM
                    </Button>
                    {crmMode === "datacrazy" &&
                      sheet.crm.status === "failed" && (
                        <Button
                          secondary
                          disabled={busy}
                          onClick={() => {
                            if (
                              window.confirm(
                                "Confira o destino: ele já recebeu este cadastro? Só prossiga se a equipe confirmou que não houve recebimento.",
                              )
                            )
                              void perform(async () =>
                                onUpdate(await saleSheetApi.retryCrm(sheet.id)),
                              );
                          }}
                        >
                          Solicitar nova tentativa CRM
                        </Button>
                      )}
                  </div>
                )}
                <p>
                  Anexo do contrato ao CRM desativado. Não existe URL pública do
                  PDF.
                </p>
              </section>
            </div>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

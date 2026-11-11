import * as Dialog from "@radix-ui/react-dialog";
import { useRef, useState } from "react";
import { Archive, ArchiveRestore, Download, Pencil, X } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { errorStatus, saleSheetApi, safeError } from "./api";
import type { CrmDeliveryMode, SheetSnapshot } from "./model";
import {
  canArchiveSheet,
  canEditSheet,
  canUnarchiveSheet,
  sheetStateLabel,
} from "./lifecycle";
import { taskLabel } from "./taskLabel";
import { Badge, Button, Summary } from "./ui";

type Confirmation = {
  title: string;
  description: string;
  label: string;
  dangerous?: boolean;
  run: () => Promise<void>;
};

export default function SheetDrawer({
  sheet,
  rawToken,
  isAdmin,
  crmMode,
  onUpdate,
  onEdit,
  onClose,
}: {
  sheet: SheetSnapshot;
  rawToken?: string;
  isAdmin: boolean;
  crmMode: CrmDeliveryMode;
  onUpdate: (sheet: SheetSnapshot, token?: string) => void;
  onEdit: () => void;
  onClose: () => void;
}) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [confirmation, setConfirmation] = useState<Confirmation | null>(null);
  const [confirmationError, setConfirmationError] = useState("");
  const confirmationTrigger = useRef<HTMLButtonElement | null>(null);
  const confirmationBack = useRef<HTMLButtonElement | null>(null);
  const confirmationContent = useRef<HTMLDivElement | null>(null);
  const drawerClose = useRef<HTMLButtonElement | null>(null);
  const actionLock = useRef(false);
  const editable = canEditSheet(sheet);
  const link = rawToken
    ? `${window.location.origin}/ficha-venda/${encodeURIComponent(rawToken)}`
    : "";
  const perform = async (
    action: () => Promise<void>,
    onFailure?: (caught: unknown) => void,
  ) => {
    if (actionLock.current) return;
    actionLock.current = true;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await action();
    } catch (caught) {
      if (onFailure) onFailure(caught);
      else setError(safeError(caught));
    } finally {
      actionLock.current = false;
      setBusy(false);
    }
  };
  const requestConfirmation = (
    trigger: HTMLButtonElement,
    details: Confirmation,
  ) => {
    if (actionLock.current || confirmation) return;
    confirmationTrigger.current = trigger;
    setConfirmationError("");
    setConfirmation(details);
  };
  const confirmAction = () => {
    if (!confirmation || confirmationError || actionLock.current) return;
    confirmationContent.current?.focus();
    void perform(
      async () => {
        await confirmation.run();
        setConfirmation(null);
      },
      (caught) => {
        const status = errorStatus(caught);
        const message =
          status && status >= 400 && status < 500
            ? safeError(caught)
            : "Não foi possível confirmar o resultado desta ação. Volte e atualize o pedido antes de tentar novamente.";
        setConfirmationError(message);
        setError(message);
      },
    );
  };
  const download = async () => {
    const blob = await saleSheetApi.download(sheet.id);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `contrato-${sheet.reference}.pdf`;
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setNotice("Download do contrato iniciado. O PDF está sem assinatura.");
  };
  return (
    <Dialog.Root
      open
      onOpenChange={(open) => {
        if (!open && !actionLock.current && !confirmation) onClose();
      }}
    >
      <Dialog.Portal>
        <div className="sale-sheet cf-drawer-layer">
          <Dialog.Overlay className="cf-drawer-overlay" />
          <Dialog.Content
            className="cf-drawer"
            aria-busy={busy}
            onEscapeKeyDown={(event) => {
              if (actionLock.current || confirmation) event.preventDefault();
            }}
            onPointerDownOutside={(event) => {
              if (actionLock.current || confirmation) event.preventDefault();
            }}
          >
            <header>
              <div>
                <span className="cf-eyebrow">
                  PEDIDO · VERSÃO {sheet.revision}
                </span>
                <Dialog.Title>{sheet.reference}</Dialog.Title>
                <Dialog.Description className="cf-muted">
                  Negociação, cadastro e próximos passos.
                </Dialog.Description>
              </div>
              <Dialog.Close
                className="cf-icon-button"
                ref={drawerClose}
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
              <Badge
                tone={
                  sheet.archivedAt
                    ? "neutral"
                    : sheet.revoked
                      ? "red"
                      : sheet.submittedAt
                        ? "green"
                        : "orange"
                }
              >
                {sheetStateLabel(sheet)}
              </Badge>
              <section className="cf-drawer-card">
                <h3>Gerenciar pedido</h3>
                {editable ? (
                  <>
                    <p>
                      Errou algum detalhe? Corrija antes do cliente enviar o
                      cadastro. Ao salvar, você recebe um novo link.
                    </p>
                    <div className="cf-button-row">
                      <Button disabled={busy} onClick={onEdit}>
                        <Pencil size={15} /> Editar pedido
                      </Button>
                      <Button
                        secondary
                        className="cf-button-danger"
                        disabled={busy}
                        onClick={(event) =>
                          requestConfirmation(event.currentTarget, {
                            title: "Cancelar pedido?",
                            description:
                              "O link do cliente deixará de funcionar. O histórico será mantido; nenhum negócio será cancelado no CRM.",
                            label: "Cancelar pedido",
                            dangerous: true,
                            run: async () => {
                              onUpdate(
                                await saleSheetApi.cancel(
                                  sheet.id,
                                  sheet.revision,
                                ),
                                "",
                              );
                              setNotice(
                                "Pedido cancelado. Ele está na área Cancelados.",
                              );
                            },
                          })
                        }
                      >
                        Cancelar pedido
                      </Button>
                    </div>
                  </>
                ) : (
                  <p>
                    {sheet.archivedAt
                      ? "O cadastro e o contrato foram preservados. Arquivar não cancela o negócio no CRM."
                      : sheet.revoked
                        ? "Este pedido foi cancelado. O link não recebe cadastros e o histórico fica preservado."
                        : "O cadastro já foi recebido. Não é possível alterar esta negociação ou substituir o contrato por aqui."}
                  </p>
                )}
                {canArchiveSheet(sheet) && (
                  <Button
                    secondary
                    disabled={busy}
                    onClick={(event) =>
                      requestConfirmation(event.currentTarget, {
                        title: "Arquivar pedido?",
                        description:
                          "O pedido vai para Arquivados. Cadastro, contrato e negócio no CRM ficam preservados. Você pode desarquivar depois.",
                        label: "Arquivar",
                        run: async () => {
                          onUpdate(
                            await saleSheetApi.archive(
                              sheet.id,
                              sheet.revision,
                            ),
                            "",
                          );
                          setNotice(
                            "Pedido movido para Arquivados. Cadastro e contrato preservados.",
                          );
                        },
                      })
                    }
                  >
                    <Archive size={15} /> Arquivar
                  </Button>
                )}
                {canUnarchiveSheet(sheet) && (
                  <>
                    <p>
                      Desarquivar só devolve o pedido à lista. Não altera o
                      contrato, não reativa links cancelados e não reenvia dados
                      ao CRM.
                    </p>
                    <Button
                      secondary
                      disabled={busy}
                      onClick={() =>
                        void perform(async () => {
                          const restored = await saleSheetApi.unarchive(
                            sheet.id,
                            sheet.revision,
                            sheet.archivedAt || "",
                          );
                          onUpdate(restored, "");
                          setNotice(
                            restored.revoked
                              ? "Pedido desarquivado. Ele voltou para Cancelados; o link continua bloqueado."
                              : "Pedido desarquivado. Ele voltou para Em andamento; cadastro e contrato foram preservados.",
                          );
                        })
                      }
                    >
                      <ArchiveRestore size={15} /> Desarquivar
                    </Button>
                  </>
                )}
              </section>
              <Summary sale={sheet} showSku />
              {editable && (
                <section className="cf-drawer-card">
                  <h3>Link do cliente</h3>
                  <p>
                    Válido até{" "}
                    {new Date(sheet.linkExpiresAt).toLocaleString("pt-BR")}.
                    Compartilhe somente com o cliente.
                  </p>
                  {link && (
                    <>
                      <div className="cf-link-preview">{link}</div>
                      <div className="cf-button-row">
                        <Button
                          secondary
                          disabled={busy}
                          onClick={() =>
                            void perform(async () => {
                              await navigator.clipboard.writeText(link);
                              setNotice("Link copiado. Envie ao cliente.");
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
                          Abrir cadastro
                        </a>
                      </div>
                    </>
                  )}
                  {!link && (
                    <p>
                      O link só aparece quando é gerado. Use o botão abaixo para
                      obter um novo.
                    </p>
                  )}
                  <div className="cf-button-row">
                    <Button
                      secondary
                      disabled={busy}
                      onClick={(event) =>
                        requestConfirmation(event.currentTarget, {
                          title: "Gerar novo link?",
                          description:
                            "O link anterior deixará de funcionar. Copie o novo link e envie na conversa com o cliente.",
                          label: "Gerar novo link",
                          run: async () => {
                            const result = await saleSheetApi.rotate(sheet.id);
                            onUpdate(result.sheet, result.token || "");
                            setNotice(
                              "Novo link gerado. Copie e envie ao cliente; o anterior não funciona mais.",
                            );
                          },
                        })
                      }
                    >
                      Gerar novo link
                    </Button>
                  </div>
                </section>
              )}
              {sheet.customer && (
                <section className="cf-drawer-card">
                  <h3>Cadastro do cliente</h3>
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
                        CEP {sheet.customer.cep}
                      </dd>
                    </div>
                  </dl>
                  <p>
                    CPF e e-mail têm validação de formato/dígitos. Isso não
                    verifica a identidade do titular.
                  </p>
                </section>
              )}
              <section className="cf-drawer-card">
                <h3>Contrato</h3>
                <p>
                  {sheet.submittedAt
                    ? taskLabel(sheet.pdf)
                    : "Disponível depois do cadastro do cliente."}{" "}
                  {sheet.submittedAt && "· Sem assinatura"}
                </p>
                <div className="cf-button-row">
                  <Button
                    disabled={busy || sheet.pdf.status !== "ready"}
                    onClick={() => void perform(download)}
                  >
                    <Download size={16} /> Baixar contrato em PDF
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
                        Tentar gerar contrato
                      </Button>
                    )}
                </div>
                <p>
                  Gustavo assina pelo gov.br. Assinatura e pagamento são
                  acompanhados pela equipe.
                </p>
              </section>
              <section className="cf-drawer-card">
                <h3>Envio ao CRM</h3>
                <p>
                  {sheet.submittedAt
                    ? taskLabel(sheet.crm)
                    : "O cadastro é enviado depois que o cliente concluir o formulário."}
                </p>
                {crmMode === "disabled" && (
                  <p>Envio ao CRM desligado. Isso não bloqueia o contrato.</p>
                )}
                {sheet.crm.status === "sent" && (
                  <p>
                    Envio confirmado. Confira o lead e o negócio no DataCrazy.
                  </p>
                )}
                {sheet.crm.status === "uncertain" && (
                  <p className="cf-uncertain-note">
                    O resultado não foi confirmado. Confira no DataCrazy antes
                    de tentar novamente, para evitar duplicação.
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
                            "Dados de integração copiados. Use somente com a equipe autorizada.",
                          );
                        })
                      }
                    >
                      Copiar dados da integração
                    </Button>
                    {crmMode === "datacrazy" &&
                      sheet.crm.status === "failed" && (
                        <Button
                          secondary
                          disabled={busy}
                          onClick={(event) =>
                            requestConfirmation(event.currentTarget, {
                              title: "Tentar envio ao CRM?",
                              description:
                                "Confirme no DataCrazy que este cadastro ainda não foi recebido. Tentar sem conferir pode duplicar o negócio. Continue somente após essa verificação.",
                              label: "Tentar envio ao CRM",
                              run: async () => {
                                onUpdate(await saleSheetApi.retryCrm(sheet.id));
                              },
                            })
                          }
                        >
                          Tentar envio ao CRM
                        </Button>
                      )}
                  </div>
                )}
                <p>
                  O PDF não é anexado ao CRM. Baixe o contrato neste pedido.
                </p>
              </section>
            </div>
            <AlertDialog
              open={Boolean(confirmation)}
              onOpenChange={(open) => {
                if (!open && !actionLock.current) setConfirmation(null);
              }}
            >
              <AlertDialogContent
                ref={confirmationContent}
                className="sale-sheet cf-confirmation"
                overlayClassName="cf-confirmation-overlay"
                aria-busy={busy}
                onOpenAutoFocus={(event) => {
                  event.preventDefault();
                  confirmationBack.current?.focus();
                }}
                onCloseAutoFocus={(event) => {
                  event.preventDefault();
                  const trigger = confirmationTrigger.current;
                  if (trigger?.isConnected && !trigger.disabled)
                    trigger.focus();
                  else drawerClose.current?.focus();
                }}
                onEscapeKeyDown={(event) => {
                  if (actionLock.current) event.preventDefault();
                }}
              >
                <AlertDialogHeader>
                  <span className="cf-eyebrow">CONFIRMAR AÇÃO</span>
                  <AlertDialogTitle>
                    {confirmation?.title || "Confirmar ação"}
                  </AlertDialogTitle>
                  <AlertDialogDescription className="cf-confirmation-description">
                    {confirmation?.description}
                  </AlertDialogDescription>
                </AlertDialogHeader>
                {confirmationError && (
                  <p className="cf-error" role="alert">
                    {confirmationError}
                  </p>
                )}
                <AlertDialogFooter className="cf-confirmation-footer">
                  <AlertDialogCancel
                    ref={confirmationBack}
                    className="cf-button cf-button-secondary"
                    type="button"
                    disabled={busy}
                  >
                    Voltar
                  </AlertDialogCancel>
                  <AlertDialogAction
                    className={
                      confirmation?.dangerous
                        ? "cf-button cf-confirmation-danger"
                        : "cf-button"
                    }
                    type="button"
                    disabled={busy || Boolean(confirmationError)}
                    onClick={(event) => {
                      event.preventDefault();
                      confirmAction();
                    }}
                  >
                    {busy ? "Processando…" : confirmation?.label || "Confirmar"}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Dialog.Content>
        </div>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

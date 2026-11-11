import type { SheetTask } from "./model";

export function taskLabel(task: SheetTask): string {
  return {
    waiting: "Aguardando",
    ready: "Disponível",
    disabled: "Desativado",
    failed: "Não concluído",
    sent: "Enviado",
    sending: "Processando",
    uncertain: "Resultado não confirmado",
  }[task.status];
}

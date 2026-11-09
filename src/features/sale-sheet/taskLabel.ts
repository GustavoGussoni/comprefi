import type { SheetTask } from "./model";

export function taskLabel(task: SheetTask): string {
  return {
    waiting: "Pendente",
    ready: "Pronto",
    disabled: "Desativado",
    failed: "Falhou",
    sent: "Recebido pelo destino · conferir negócio",
    sending: "Em andamento",
    uncertain: "Resultado incerto · conferir recebimento",
  }[task.status];
}

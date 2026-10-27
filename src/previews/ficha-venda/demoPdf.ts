import { jsPDF } from "jspdf";
import { deliveryText, money, paymentName, total, type Sale } from "./model";

/** Documento de teste gerado no navegador. Nunca assina nem contata serviços. */
export function downloadDemoPdf(sale: Sale) {
  if (!sale.customer || sale.pdf !== "ready")
    throw new Error("Conclua o cadastro demonstrativo primeiro.");
  const pdf = new jsPDF({ unit: "mm", format: "a4" });
  const c = sale.customer;
  let y = 24;
  const text = (value: string, size = 10, bold = false) => {
    pdf.setFont("helvetica", bold ? "bold" : "normal");
    pdf.setFontSize(size);
    const lines = pdf.splitTextToSize(value, 170) as string[];
    const height = lines.length * (size * 0.42 + 1.6);
    if (y + height > 265) {
      pdf.addPage();
      y = 24;
    }
    pdf.text(lines, 20, y);
    y += height + 3;
  };
  const section = (title: string) => {
    y += 3;
    text(title.toUpperCase(), 10, true);
  };
  pdf.setTextColor(227, 94, 17);
  text("CompreFi", 23, true);
  pdf.setTextColor(25, 25, 25);
  text("FICHA CONTRATUAL DEMONSTRATIVA", 14, true);
  text("SEM VALIDADE CONTRATUAL - NAO ASSINADO - SOMENTE PREVIA", 9, true);
  text(
    `Referencia: ${sale.reference} | Versao: 1 | Gerado a partir da ficha de demonstracao.`,
    9
  );
  text(
    "Este arquivo serve apenas para revisar o fluxo e os campos. Nao e o contrato juridico definitivo e nao comprova identidade, assinatura, pagamento ou entrega. Nao utilize em vendas reais.",
    9
  );
  section("1. Cadastro de exemplo");
  text(
    `Titular: ${c.name}\nCPF de teste: ${c.cpf}\nCelular: ${c.phone}\nE-mail: ${c.email}\nNascimento: ${c.birth.split("-").reverse().join("/")}`
  );
  text(
    `Endereco: ${c.street}, ${c.number}${c.complement ? ` - ${c.complement}` : ""}\nBairro: ${c.district} | Cidade: ${c.city}/${c.state} | CEP: ${c.cep}`
  );
  section("2. Produto e condicao registrada");
  text(
    `${sale.quantity} unidade(s) - ${sale.product}\nCor: ${sale.color} | Armazenamento: ${sale.storage}\nCondicao: ${sale.condition}`
  );
  section("3. Condicao financeira combinada");
  text(
    `Modalidade: ${paymentName(sale.payment)}\nVolta/valor base negociado: ${money(sale.base)}\nPIX: ${money(sale.pix)}\nCartao: ${money(sale.card)}${sale.card > 0 ? ` em ${sale.installments}x (parcela aproximada de ${money(sale.card / sale.installments)})` : ""}\nTotal financeiro contratado: ${money(total(sale))}`
  );
  if (sale.hasTrade) {
    section("4. Aparelho recebido na troca");
    text(
      `${sale.tradeModel} | ${sale.tradeStorage} | ${sale.tradeColor}\nCredito atribuido ao seminovo: ${money(sale.credit)}\nIMEI/serial: ${sale.imei || "Pendente de identificacao no recebimento"}\nEstado registrado: ${sale.tradeNotes || "A registrar no termo de recebimento"}`
    );
    text(
      "O credito da troca ja esta abatido na volta. Nao descontar novamente. O aparelho sera recebido junto com a entrega do produto vendido. Se ja tiver sido revendido em caso de devolucao aplicavel, a regra comercial informada preve restituir o credito atribuido, sem afastar os demais direitos legais.",
      9
    );
  }
  section("5. Entrega");
  text(`${deliveryText(sale)}.\nModalidade: ${sale.deliveryMode}.`);
  if (sale.notes) {
    section("Observacoes");
    text(sale.notes);
  }
  section("6. Proximos passos - apenas demonstracao");
  text(
    "Na V1 definitiva, Iago baixara o contrato para Gustavo assinar manualmente pelo gov.br. Depois, a equipe encaminhara o documento ao cliente. Nenhuma assinatura e incorporada ou declarada por esta previa."
  );
  text(
    "O texto juridico final, a qualificacao da empresa, as garantias, cancelamento e campos de assinatura serao revisados antes do uso real. Este arquivo nao reproduz assinaturas ou dados do contrato de exemplo.",
    9
  );
  for (let i = 1; i <= pdf.getNumberOfPages(); i++) {
    pdf.setPage(i);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(8);
    pdf.setTextColor(150, 70, 25);
    pdf.text(
      `DEMONSTRACAO - NAO ASSINADO | ${sale.reference} | ${i}/${pdf.getNumberOfPages()}`,
      20,
      285
    );
  }
  pdf.save(`CompreFi-DEMONSTRATIVO-${sale.reference}-v1.pdf`);
}

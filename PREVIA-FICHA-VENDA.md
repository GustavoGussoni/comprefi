# Prévia da ficha de venda CompreFi

Branch: `feat/ficha-venda-preview-20261027`. Base: `16497a0082f4b6249834f3345e13068c4cea9daf` (main consultada em 27/10/2026).

## Escopo desta entrega

Prévia frontend isolada para revisão de experiência, copy e campos. Não adiciona rotas ao App atual, não muda a autenticação existente nem o build normal do site. O admin demonstrativo usa Iago fictício, sem login: não é um desvio de autenticação do admin real, é uma entrada independente, sem dados de produção.

- Lista de fichas, filtros e painel lateral.
- Nova ficha com produto, WhatsApp do atendimento, condições finais de PIX/cartão/misto, parcelas e acréscimo discriminado.
- Registro do seminovo e crédito já abatido na volta, sem desconto em duplicidade.
- Entrega padrão de 1 a 15 dias úteis após confirmação do pagamento ou data máxima manual.
- Formulário do cliente em três etapas: identificação, endereço e conferência.
- Situações simuladas de CRM e PDF independentes.
- Download de PDF demonstrativo, sem assinatura e sem validade contratual.

## Rodar a prévia

```bash
npm ci
npm run dev -- --host 0.0.0.0
# Abrir /ficha-preview.html
```

Para compilar a entrada independente:

```bash
npm run build:ficha-preview
# Saída em dist-ficha-preview/ficha-preview.html
```

O build padrão (`npm run build`) continua usando o index.html/App atual. Não há alteração de main.tsx, App.tsx ou index.html de produção. Os componentes da nova experiência estão em `src/previews/ficha-venda` e usam CSS próprio, sem depender do Tailwind 4 do ambiente de revisão.

## Testar com segurança

Use o botão **Usar exemplo fictício** na criação, ou abra a visão do cliente e use **Preencher com exemplo fictício**. Depois de avançar e simular o envio, volte ao admin para baixar o PDF. O painel permite simular falha do CRM sem bloquear o download.

Os dados existem apenas na memória desta aba. Recarregar apaga as novas fichas e restaura os exemplos. O link copiado não é um link de atendimento real nem compartilha dados entre aparelhos/abas. A cópia serve só para revisar a ação; o link real persistente e seguro depende da implementação backend futura. Não enviar a clientes reais.

A entrada demonstrativa não importa o cliente da API e não contém analytics, webhook, autenticação, upload ou integração de pagamentos. Não inserir dados pessoais reais. O PDF é criado localmente apenas para testar o download e os campos, não reproduz o modelo jurídico ou assinaturas do contrato enviado pelo proprietário.

## Fora do escopo desta prévia

Persistência segura, permissões reais de Iago/Gustavo, links imprevisíveis/expiráveis/revogáveis no servidor, proteção contra duplicidade, validação backend, aviso de privacidade definitivo, workflow DataCrazy, armazenamento privado e geração definitiva de contratos. Gov.br, checkout, cobrança e assinatura automática não estão incluídos.

Na V1, as condições negociadas serão congeladas por versão, a referência do lead continuará sendo o WhatsApp do atendimento e CRM/PDF terão processamento e repetição independentes. Essas garantias de servidor não são implementadas por esta demonstração visual.

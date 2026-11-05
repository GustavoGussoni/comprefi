# Ficha de venda — integração isolada

A feature usa a navegação e sessão reais em `/admin/fichas` e a rota pública `/ficha-venda/:token`, sem Layout/Header/Footer comerciais. Não há autenticação alternativa, catálogo duplicado, estoque local ou recebimento de seminovo nesta preparação.

`VITE_FICHA_VENDA_ENABLED` só habilita a aba quando for exatamente `true`; padrão desativado. O backend possui flag independente e `/ficha-venda/health` informa `status: ok` e `crmMode: disabled | datacrazy`. Sem disponibilidade da API, o público não abre o cadastro.

## Sessão e privacidade

O admin JSON reutiliza `apiService.request`. O PDF usa `API_BASE_URL` exportada do cliente HTTP existente e a sessão `admin_token` no momento da ação. A constante não muda o endpoint ou a autenticação antiga. A rota pública não envia auth/cookies e usa `no-store`, `no-referrer` e redirects bloqueados, sem fotos externas, analytics ou widgets.

A proteção do Pixel foi implementada no `index.html`, antes do React. Links da ficha não inicializam/carregam Pixel; o fallback noscript rastreador foi removido. Navegação SPA entre página comercial e ficha usa um documento completo antes de mudar a URL, para não expor o token ao SDK já carregado. O Pixel permanece nas páginas comerciais. A meta de referrer é emitida antes dos scripts. Conferir também logs e telemetria da hospedagem antes de publicar.

O cadastro permanece só na memória e é removido do estado após sucesso. Não é gravado em localStorage/sessionStorage e não possui botão de preenchimento fictício. CPF é conferido matematicamente e e-mail sintaticamente; isso não confirma identidade nem titularidade. ViaCEP recebe somente CEP, sem credenciais/referrer, com timeout e cancelamento de respostas obsoletas. Os campos editados manualmente são preservados; falhas permitem preenchimento manual.

## Idempotência e negócio

`SubmissionAttempt` mantém chave e corpo do primeiro envio e bloqueia chamadas simultâneas. Resposta perdida conserva a tentativa; só rejeição conhecida 400/422 permite uma nova edição/tentativa. Timeout, 409 e 5xx não disparam replay automático. Repetição de criação recupera a mesma ficha; sem token bruto disponível, a renovação explícita gera um novo link. Não há reenvio automático de CRM com resultado incerto.

Os valores são negociados manualmente, sem preços do catálogo. O crédito da troca não é abatido novamente. A tela envia apenas campos comerciais permitidos; SKU, identidade do vendedor e versões são resolvidos no servidor. SKU congelado aparece só no admin.

ADMIN consulta a equipe e possui controles CRM. SALES consulta fichas próprias e não vê payload/retry CRM. O servidor verifica a permissão atual. O diálogo prende e devolve foco, permite Escape quando ocioso e bloqueia ações/saída durante processamento. O download usa Blob autenticado, sem URL pública de PDF ou regeneração de documento pronto.

## Validação local

Usar dependências locais de leitura, ambiente vazio e API/banco novos descartáveis. Não ler `.env` nem credenciais reais. O frontend real passou tipos, lint do escopo e builds com flag true/false. O dry-run do lockfile é realizado separadamente no backend, sem scripts de instalação.

```sh
node src/features/sale-sheet/tests/run-unit.mjs
node_modules/.bin/eslint src/features/sale-sheet src/App.tsx src/pages/Admin.tsx
node_modules/.bin/tsc --noEmit -p tsconfig.app.json
```

Auditoria em `/home/ubuntu/comprefi-audit/ficha-release-20261104`: testes PostgreSQL/API/browser usam somente portas 3160–3164. `test-private-bootstrap.py` testa o HTML com SDK mockado, inclusive sem JavaScript e navegação privada/comercial. `vite-build-isolated.config.mjs` permite build do worktree real com diretório de ambiente vazio e saída fora do repositório. Este bloco não inclui push, PR, merge ou deploy.

## Validação de prazo — atualização em 05/11

HTTP 400 com o código conhecido `delivery_deadline_expired` mostra uma orientação fixa para revisar a negociação com a CompreFi e receber uma nova ficha. O frontend não exibe mensagens arbitrárias retornadas pela API, nem dados privados no erro. Outros erros mantêm as mensagens e a política de idempotência existentes. Este ajuste não muda cláusulas, layout, prazo negociado ou valores.

Configuração preparada para staging: `/home/ubuntu/comprefi-audit/ficha-staging-preparacao-20261105/STAGING-CONFIGURACAO.md`. Ambiente hospedado ainda não criado ou publicado nesta etapa; os testes continuam com bancos e usuários sintéticos e CRM real desativado.

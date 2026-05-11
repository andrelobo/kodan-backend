# KODAN BACKEND

Backend principal do Kodan AI Coding Assistant.

Responsável por:
- orchestration do agent
- integração com modelos
- tool execution
- filesystem access
- resposta HTTP ao frontend
- agent loop
- workspace sandbox

---

# OBJETIVO

Transformar Kodan em um AI Engineering Assistant local-first.

O backend é o cérebro operacional do sistema.

Funções principais:
- interpretar prompts
- selecionar modelos
- executar tools
- controlar contexto
- proteger filesystem
- orquestrar reasoning multi-step

---

# STACK

- Node.js
- TypeScript
- Express
- Ollama
- ts-node-dev

---

# ESTADO REAL ATUAL

## API

- `GET /` retorna healthcheck do serviço
- `POST /generate` recebe `{ prompt }`
- a resposta atual de `/generate` retorna:
  - `output`
  - `model`

## Integração com o frontend

- o frontend esperado está em `../frontend/kodan`
- o consumo local ocorre via `http://localhost:3000/generate`
- CORS está liberado para desenvolvimento local

## Streaming

O backend ainda não faz token streaming HTTP para o cliente final.

Hoje o fluxo é:
- receber prompt
- escolher modelo
- rodar o agent loop
- devolver resposta final em JSON

---

# ARQUITETURA

src/
├── agent/
├── config/
├── routes/
├── services/
└── tools/

---

# AGENT RUNTIME

## runAgent.ts

Core do reasoning loop.

Responsável por:
- enviar prompts
- interpretar respostas
- executar tools
- retornar resultados
- controlar steps

Observação:
- o loop interno pode ser multi-step
- a resposta para o frontend continua sendo final e síncrona

---

## toolParser.ts

Interpreta tool calls geradas pelo modelo.

Formato padrão:

```json
{
  "tool": "readFile",
  "args": {
    "path": "./src/server.ts"
  }
}
```

---

## toolExecutor.ts

Executa tools reais.

Responsável por:
- sandbox filesystem
- validação de path
- roteamento de tools

---

# TOOLS

## readFile

Lê arquivos do workspace.

---

## writeFile

Escreve arquivos.

Uso controlado.

---

## listFiles

Lista estrutura do projeto.

---

# WORKSPACE

Workspace atual:

/home/lobo/Área de trabalho/codex-local/backend

Toda operação deve permanecer dentro do workspace.

Nunca permitir:
- path traversal
- ../../../
- acesso externo

---

# MODELOS

## FAST

qwen2.5-coder:1.5b

Uso:
- snippets rápidos
- autocomplete
- respostas leves

---

## HEAVY

deepseek-coder:6.7b

Uso:
- agent loop
- reasoning
- refatoração
- tool calling

---

## CHAT

qwen2.5:3b

Uso:
- conversa
- suporte técnico
- explicações

---

# ROUTER

Router inteligente baseado em intenção.

Exemplos:

- "Leia src/server.ts"
→ HEAVY

- "Crie debounce"
→ FAST

- "Explique JWT"
→ CHAT

---

# PRINCÍPIOS

## HUMAN-IN-THE-LOOP

Nunca alterar código automaticamente sem aprovação.

Fluxo ideal:

readFile
→ análise
→ patch
→ aprovação
→ applyPatch

---

## PATCHES > OVERWRITE

Evitar sobrescrever arquivos completos.

Prioridade:
- diffs
- patches
- alterações mínimas

---

## LOCAL-FIRST

Inferência local prioritária.

Cloud é aceleração/fallback.

---

# PROBLEMAS IDENTIFICADOS

## Loop de tools

Modelos pequenos repetem tools.

Mitigação:
- loop detection
- usedTools
- prompt hardening

---

## Context explosion

Arquivos grandes degradam inferência.

Mitigação:
- truncate context
- compact tool result
- reduzir history

---

## CPU bottleneck

Máquina:
- i7-4790
- 16GB RAM

Limitações:
- context windows grandes
- modelos >7B

---

# ROADMAP

## PRIORIDADE ATUAL

- diff engine
- patch system
- approval flow
- streaming HTTP real para o cliente

---

## FUTURO

- semantic search
- AST engine
- embeddings
- terminal integration
- git integration
- multi-file refactors

---

# FILOSOFIA

Kodan Backend NÃO é apenas uma API.

É um runtime agentic de engenharia assistida por IA.

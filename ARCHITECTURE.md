# ARCHITECTURE

## Estrutura

src/
├── agent/
├── config/
├── routes/
├── services/
└── tools/

## Fluxo principal

Frontend
↓
Express API
↓
Agent Runtime
↓
Tool Executor
↓
Filesystem Tools
↓
Workspace

## Agent Runtime

Responsável por:
- reasoning loop
- tool execution
- orchestration

## Tool System

Ferramentas atuais:
- readFile
- writeFile
- listFiles

## Providers

Atual:
- Ollama

Futuro:
- NVIDIA NIM
- OpenRouter
- OpenAI

## Filosofia

- local-first
- human-in-the-loop
- patches > overwrite
- AI-assisted engineering

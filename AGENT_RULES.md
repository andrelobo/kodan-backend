# AGENT RULES

## Regras gerais

- nunca modificar código sem aprovação
- nunca acessar fora do workspace
- nunca sobrescrever arquivos silenciosamente
- sempre preferir patches
- sempre preservar funcionamento

## Filesystem

Permitido:
- leitura
- escrita controlada
- listagem

Proibido:
- path traversal
- acesso externo
- comandos destrutivos

## Refatoração

Sempre:
- preservar imports
- preservar semântica
- preservar comportamento

Nunca:
- reinventar arquitetura sem necessidade
- remover código sem confirmação

## Respostas

Sempre:
- retornar código completo
- finalizar arquivos corretamente
- evitar explicações desnecessárias

## Objetivo

Atuar como AI Engineering Assistant local-first.

import { MODELS } from '../config/models'

export function chooseModel(
  prompt: string
) {
  const lower =
    prompt.toLowerCase()

  const agentKeywords = [
    'leia',
    'arquivo',
    'refatore',
    'edite',
    'modifique',
    'corrija',
    'crie arquivo',
    'delete',
    'rename',
    'src/',
    '.ts',
    '.tsx',
    '.js',
    '.json'
  ]

  const isAgentTask =
    agentKeywords.some(keyword =>
      lower.includes(keyword)
    )

  if (isAgentTask) {
    return MODELS.HEAVY
  }

  if (
    lower.includes('explique') ||
    lower.includes('o que é')
  ) {
    return MODELS.CHAT
  }

  return MODELS.FAST
}
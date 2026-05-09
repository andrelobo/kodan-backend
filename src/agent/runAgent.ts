import { parseToolCall } from './toolParser'

import { executeTool } from './toolExecutor'

import { INFERENCE } from '../config/inference'

import { SYSTEM_PROMPTS } from '../config/prompts'

import { OLLAMA_CONFIG } from '../config/ollama'

function truncateContent(
  content: string,
  max = 4000
) {
  if (content.length <= max) {
    return content
  }

  return (
    content.slice(0, max) +
    '\n...[TRUNCATED]'
  )
}

export async function runAgent(
  model: string,
  userPrompt: string
) {
  let currentPrompt = `
${SYSTEM_PROMPTS.DEFAULT}

USUÁRIO:
${userPrompt}
`

  const usedTools = new Set<string>()

  for (let step = 0; step < 5; step++) {
    console.log(
      `\n🧠 AGENT STEP ${step + 1}`
    )

    const startedAt = Date.now()

    const response = await fetch(
      `${OLLAMA_CONFIG.BASE_URL}/api/generate`,
      {
        method: 'POST',

        headers: {
          'Content-Type':
            'application/json'
        },

        body: JSON.stringify({
          model,

          stream: false,

          prompt: currentPrompt,

          options: INFERENCE
        })
      }
    )

    const data = await response.json()

    const raw =
      data.response || ''

    const cleaned = raw
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .replace(/typescript/g, '')
      .replace(/<\｜.*?\｜>/g, '')
      .replace(/<\|.*?\|>/g, '')
      .trim()

    const elapsed =
      (
        (Date.now() - startedAt) /
        1000
      ).toFixed(2)

    console.log(
      `⏱ STEP ${step + 1}: ${elapsed}s`
    )

    console.log('\n📦 RESPONSE:')
    console.log(cleaned)

    const toolCall =
      parseToolCall(cleaned)

    if (!toolCall) {
      return cleaned
    }

    const toolKey = JSON.stringify(
      toolCall
    )

    if (usedTools.has(toolKey)) {
      return (
        'Loop detectado na execução.'
      )
    }

    usedTools.add(toolKey)

    console.log(
      '\n🛠 EXECUTANDO TOOL'
    )

    const toolResult =
      await executeTool(toolCall)

    const compactResult =
      JSON.stringify(toolResult)

    currentPrompt += `

TOOL EXECUTADA:
${toolCall.tool}

RESULTADO:
${truncateContent(compactResult)}

`
  }

  throw new Error(
    'Limite de steps atingido'
  )
}
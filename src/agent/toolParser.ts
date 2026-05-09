type ParsedToolCall = {
  tool: string

  args?: Record<string, any>
}

function extractJson(
  text: string
) {
  const start = text.indexOf('{')

  const end = text.lastIndexOf('}')

  if (start === -1 || end === -1) {
    return null
  }

  return text.slice(start, end + 1)
}

export function parseToolCall(
  response: string
): ParsedToolCall | null {
  try {
    const jsonString =
      extractJson(response)

    if (!jsonString) {
      return null
    }

    const parsed = JSON.parse(
      jsonString
    )

    if (!parsed.tool) {
      return null
    }

    return {
      tool: parsed.tool,

      args: parsed.args || {}
    }

  } catch {
    return null
  }
}
import path from 'path'

import { readFile } from '../tools/readFile'

import { writeFile } from '../tools/writeFile'

import { listFiles } from '../tools/listFiles'

const ROOT_DIR = process.cwd()

type ToolCall = {
  tool: string

  args?: Record<string, any>
}

function safePath(targetPath: string) {
  const resolvedPath = path.resolve(
    ROOT_DIR,
    targetPath
  )

  if (
    !resolvedPath.startsWith(ROOT_DIR)
  ) {
    throw new Error(
      'Path inválido'
    )
  }

  return resolvedPath
}

export async function executeTool(
  toolCall: ToolCall
) {
  const { tool, args } = toolCall

  console.log('\n🛠 TOOL CALL')
  console.log('🔧 Tool:', tool)

  switch (tool) {
    case 'readFile': {
      if (!args?.path) {
        throw new Error(
          'path obrigatório'
        )
      }

      const target = safePath(
        args.path
      )

      console.log(
        '📖 Lendo:',
        target
      )

      const content =
        await readFile(target)

      return {
        success: true,

        tool,

        path: target,

        content
      }
    }

    case 'writeFile': {
      if (!args?.path) {
        throw new Error(
          'path obrigatório'
        )
      }

      if (
        typeof args.content !==
        'string'
      ) {
        throw new Error(
          'content obrigatório'
        )
      }

      const target = safePath(
        args.path
      )

      console.log(
        '✍️ Escrevendo:',
        target
      )

      await writeFile(
        target,
        args.content
      )

      return {
        success: true,

        tool,

        path: target
      }
    }

    case 'listFiles': {
      const target = safePath(
        args?.path || '.'
      )

      console.log(
        '📂 Listando:',
        target
      )

      const files =
        await listFiles(target)

      return {
        success: true,

        tool,

        path: target,

        files
      }
    }

    default:
      throw new Error(
        `Tool não suportada: ${tool}`
      )
  }
}
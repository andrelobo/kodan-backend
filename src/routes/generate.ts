import { Router } from 'express'

import { chooseModel } from '../services/llm'

import { runAgent } from '../agent/runAgent'

const router = Router()

router.post('/', async (req, res) => {
  try {
    const { prompt } = req.body

    if (!prompt) {
      return res.status(400).json({
        error: 'Prompt obrigatório'
      })
    }

    console.log('\n🟡 [REQUEST]')
    console.log('📝 Prompt:', prompt)

    const model = chooseModel(prompt)

    console.log('🎯 Modelo:', model)

    const start = Date.now()

    const output =
      await runAgent(
        model,
        prompt
      )

    const total =
      (
        (Date.now() - start) /
        1000
      ).toFixed(2)

    console.log('\n✅ FINALIZADO')
    console.log(`⏱ ${total}s`)

    return res.json({
      output,
      model
    })

  } catch (err: any) {
    console.log(
      '\n❌ ERRO:',
      err.message
    )

    return res.status(500).json({
      error: err.message
    })
  }
})

export default router

import express from 'express'
import cors from 'cors'

import generateRoute from './routes/generate'

const app = express()

app.use(cors())

app.use(express.json())

app.get('/', (_, res) => {
  res.json({
    status: 'ok',
    service: 'nora-backend'
  })
})

app.use('/generate', generateRoute)

const PORT = 3000

app.listen(PORT, () => {
  console.log(
    `🚀 Codex local rodando em http://localhost:${PORT}`
  )
})
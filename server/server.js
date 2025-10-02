import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'

const app = express()
const PORT = process.env.PORT || 8787

app.use(cors())
app.use(express.json({ limit: '1mb' }))

// POST /api/chat-completions
app.post('/api/chat-completions', async (req, res) => {
  const { prompt, model = process.env.OPENAI_MODEL || 'gpt-4o-mini' } = req.body || {}
  if (!prompt) return res.status(400).json({ error: 'prompt required' })

  try {
    const apiBase = process.env.OPENAI_BASE || 'https://api.openai.com/v1'
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) return res.status(500).json({ error: 'OPENAI_API_KEY missing' })

    const r = await fetch(apiBase.replace(/\/+$/, '') + '/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model,
        messages: [{ role: 'user', content: prompt }],
        temperature: 0.7
      })
    })

    if (!r.ok) {
      const text = await r.text()
      return res.status(r.status).json({ error: 'Upstream error', detail: text })
    }
    const data = await r.json()
    const text = data?.choices?.[0]?.message?.content || ''
    res.json({ text })
  } catch (err) {
    res.status(500).json({ error: 'proxy_failed', detail: String(err) })
  }
})

app.get('/health', (_, res) => res.json({ ok: true }))

app.listen(PORT, () => {
  console.log(`Proxy server running on http://localhost:${PORT}`)
})

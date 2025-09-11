import express from 'express'
import cors from 'cors'
import fetch from 'node-fetch'
import dotenv from 'dotenv'
dotenv.config()

const app = express()
const PORT = process.env.PORT || 4000
app.use(cors())
app.use(express.json())

const GEMINI_URL = 'https://generativelanguage.googleapis.com/v1beta/openai/chat.completions?model=gemini-1.5-flash'
const KEY = process.env.GEMINI_API_KEY
if(!KEY) {
  console.error('Missing GEMINI_API_KEY in env')
  process.exit(1)
}

app.post('/api/gemini', async (req, res) => {
  try {
    const body = req.body
    const response = await fetch(GEMINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${KEY}`
      },
      body: JSON.stringify(body)
    })

    const text = await response.text()
    res.status(response.status).send(text)
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: err.message || 'Server error' })
  }
})

app.listen(PORT, ()=> console.log(`Proxy server listening on http://localhost:${PORT}`))

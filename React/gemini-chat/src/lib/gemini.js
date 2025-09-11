const BASE = 'https://generativelanguage.googleapis.com/v1beta/openai/'
const USE_PROXY = import.meta.env.VITE_USE_PROXY === 'true'
const PROXY_URL = import.meta.env.VITE_PROXY_URL

function timeout(ms){
  return new Promise((_, rej) => setTimeout(()=> rej(new Error('timeout')), ms))
}

async function callGemini(payload, { retries = 1, timeoutMs = 15000 } = {}){
  if(USE_PROXY){
    if(!PROXY_URL) throw new Error('VITE_PROXY_URL is not set')
  }else{
    const key = import.meta.env.VITE_GEMINI_API_KEY
    if(!key) throw new Error('Missing Gemini API key. Set VITE_GEMINI_API_KEY in .env.local')
  }

  const url = USE_PROXY ? PROXY_URL : (BASE + 'chat.completions?model=gemini-1.5-flash')

  for(let attempt=0; attempt<=retries; attempt++){
    try{
      const controller = new AbortController()
      const fetchPromise = fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(USE_PROXY ? {} : { 'Authorization': `Bearer ${import.meta.env.VITE_GEMINI_API_KEY}` })
        },
        body: JSON.stringify(payload),
        signal: controller.signal
      })

      const res = await Promise.race([fetchPromise, timeout(timeoutMs).then(()=> { controller.abort(); throw new Error('Request timed out') })])

      if(!res.ok){
        const text = await res.text()
        throw new Error(`HTTP ${res.status}: ${text}`)
      }

      const data = await res.json()

      // Try common extraction strategies for Gemini/OpenAI shaped responses
      let assistant = ''

      if(data.choices && data.choices.length){
        const c = data.choices[0]
        if(c.message && c.message.content){
          const content = c.message.content
          if(typeof content === 'string') assistant = content
          else if(Array.isArray(content)) assistant = content.map(p => p.text || p[Object.keys(p)[0]] || '').join('')
          else assistant = content[0]?.text || ''
        }else if(c.output_text) {
          assistant = c.output_text
        }
      } else if(data.output && Array.isArray(data.output) && data.output[0]?.content){
        // older API shapes
        assistant = data.output[0].content.map(p => p.text || '').join('')
      } else if(data.result && typeof data.result === 'string'){
        assistant = data.result
      }

      return assistant || '(no content returned)'
    }catch(err){
      if(attempt === retries) throw err
      // small backoff
      await new Promise(r => setTimeout(r, 500 * (attempt+1)))
    }
  }
}

export async function sendToGemini(userMessage){
  // Gemini Chat schema (simple)
  const payload = {
    messages: [
      { role: 'user', content: [{ type: 'text', text: userMessage }] }
    ],
    max_output_tokens: 512
  }

  return callGemini(payload, { retries: 1, timeoutMs: 15000 })
}

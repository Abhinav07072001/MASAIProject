import React, { useState } from 'react'
import { useChatDispatch, useChatState } from '../../context/ChatContext'
import { sendToGemini } from '../../lib/gemini'
import styles from './ChatInput.module.css'

export default function ChatInput(){
  const [text, setText] = useState('')
  const dispatch = useChatDispatch()
  const { loading } = useChatState()

  async function handleSend(e){
    e.preventDefault()
    const trimmed = text.trim()
    if(!trimmed) return

    const userMessage = { role: 'user', text: trimmed, time: Date.now() }
    dispatch({ type: 'ADD_MESSAGE', payload: userMessage })
    setText('')

    dispatch({ type: 'SET_LOADING', payload: true })

    try{
      const assistantText = await sendToGemini(trimmed)
      const assistantMessage = { role: 'assistant', text: assistantText, time: Date.now() }
      dispatch({ type: 'ADD_MESSAGE', payload: assistantMessage })
    }catch(err){
      console.error(err)
      const errorMsg = { role: 'assistant', text: `Error: ${err.message || 'Request failed'}`, time: Date.now() }
      dispatch({ type: 'ADD_MESSAGE', payload: errorMsg })
    }finally{
      dispatch({ type: 'SET_LOADING', payload: false })
    }
  }

  return (
    <form className={styles.form} onSubmit={handleSend} aria-label="Send message">
      <textarea
        aria-label="Message input"
        className={styles.input}
        value={text}
        onChange={(e)=>setText(e.target.value)}
        placeholder="Type a message…"
        disabled={loading}
        rows={2}
        onKeyDown={(e)=>{ if(e.key === 'Enter' && !e.shiftKey){ e.preventDefault(); handleSend(e) } }}
      />
      <button className={styles.send} type="submit" disabled={loading || !text.trim()} aria-disabled={loading}>
        {loading ? 'Sending...' : 'Send'}
      </button>
    </form>
  )
}

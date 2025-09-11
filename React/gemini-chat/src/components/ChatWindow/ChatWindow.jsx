import React, { useEffect, useRef } from 'react'
import { useChatState } from '../../context/ChatContext'
import MessageBubble from '../MessageBubble/MessageBubble'
import styles from './ChatWindow.module.css'

export default function ChatWindow(){
  const { messages, loading } = useChatState()
  const listRef = useRef(null)

  useEffect(()=>{
    const el = listRef.current
    if(el) el.scrollTop = el.scrollHeight
  }, [messages])

  return (
    <section className={styles.window} aria-live="polite" aria-label="Chat messages">
      <div ref={listRef} className={styles.messages}>
        {messages.map((m, i) => (
          <MessageBubble key={i} role={m.role} text={m.text} time={m.time} />
        ))}
        {loading && (
          <div className={styles.loadingRow}>Assistant is typing…</div>
        )}
      </div>
    </section>
  )
}

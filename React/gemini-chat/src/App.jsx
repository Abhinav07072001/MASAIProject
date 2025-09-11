import React from 'react'
import ChatWindow from './components/ChatWindow/ChatWindow'
import ChatInput from './components/ChatInput/ChatInput'
import styles from './App.module.css'

export default function App(){
  return (
    <div className={styles.appContainer}>
      <header className={styles.header}>
        <h1>Gemini Chat Widget</h1>
      </header>
      <main className={styles.chatArea}>
        <ChatWindow />
        <ChatInput />
      </main>
    </div>
  )
}

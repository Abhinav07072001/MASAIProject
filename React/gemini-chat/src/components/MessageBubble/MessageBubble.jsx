import React from 'react'
import clsx from 'classnames'
import styles from './MessageBubble.module.css'

export default function MessageBubble({ role, text, time }){
  const isUser = role === 'user'
  return (
    <div className={clsx(styles.row, isUser ? styles.userRow : styles.assistantRow)}>
      <div className={clsx(styles.bubble, isUser ? styles.userBubble : styles.assistantBubble)}>
        <div className={styles.text}>{text}</div>
        {time && <div className={styles.ts} aria-hidden>{new Date(time).toLocaleTimeString()}</div>}
      </div>
    </div>
  )
}

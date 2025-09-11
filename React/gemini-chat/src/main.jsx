import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import { ChatProvider } from './context/ChatContext'
import './index.css'

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChatProvider>
      <App />
    </ChatProvider>
  </React.StrictMode>
)

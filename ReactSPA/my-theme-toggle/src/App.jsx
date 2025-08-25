import { useState } from 'react'
import  Toolbar from './components/Toolbar.jsx'
import { ThemeProvider } from '../context/theme-context.jsx'
import './App.css'

export default function App() {
  

  return (
    
      <ThemeProvider>
        <div style={{padding: "2rem"}}>
          <h1>React Context API Example</h1>
          <Toolbar />
        </div>
      </ThemeProvider>
    
  );
}



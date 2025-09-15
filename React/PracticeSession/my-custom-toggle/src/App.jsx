import { useState } from 'react'
import { useTheme } from './hooks/useTheme.js'
import './App.css'

function App() {
  const {theme, toggleTheme}= useTheme();
  return(
    <div style={{
      background:theme==="light" ?"#fff" : "#333",
      color:theme=== "light"?"#000": "#fff",
      minHeight:"100vh",
      display:"flex",
      flexDirection:"column",
      justifyContent:"center",
      alignItems:"center",
      padding:"2vh"
    }}>
      <h1>Current Theme</h1>
      <button  onClick={toggleTheme}>Toggle Theme</button> 
      
    </div>
  );
}

export default App

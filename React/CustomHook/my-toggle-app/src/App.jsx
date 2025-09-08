import { useState } from 'react'
import './App.css'
import useToggle from './hooks/useToggle.js'

function App() {
  const [item, toggleItem]=useToggle(["A","B","C","D","E"], 1);
  return(
    <div>
      <h1>Current Item: {item}</h1>
      <button onClick={toggleItem}>Next</button>
    </div>


  );
}

export default App

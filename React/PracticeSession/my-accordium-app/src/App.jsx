import { useState } from 'react'
import './App.css'
import Accordian from './components/Accordian.jsx'

function App() {
  const faqs=[
    {question:"What is React" ,answer:"React is a Js library"},
    {question:"What is useState", answer:"usesate lets you use state"},
    {question:"what is useEffect", answer:"useEffect lets you run side effects"}
  ]

  return(
    <Accordian faqs={faqs} />
  )
}

export default App

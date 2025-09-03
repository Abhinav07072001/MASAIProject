import {Routes, Route, Navigate, Link} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Weather from "./pages/Weather.jsx"
import { useState } from 'react'
import './App.css'

function App() {
   return(
    <div className="container">
      <header className="header" style={{marginTop: 24, marginBottom: 12}}>
        <div className="logo" />
        <h1 style={{margin:"0"}}>Weather Dashboard</h1>
        <div style={{marginLeft:"auto"}}><Link to= '/' className="small">Home</Link></div>
      </header>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/weather/:city" element={<Weather />} />
        <Route path="*" element={<Navigate to='/' replace/>}/>
      </Routes>
    </div>
   );
  
}

export default App

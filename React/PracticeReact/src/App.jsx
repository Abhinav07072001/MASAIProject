import { useEffect, useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import NavBar from './components/Navbar.jsx'
import Home from './pages/Home.jsx'
import About from './pages/About.jsx'
import PostDetails from './pages/PostDetails.jsx'

function App() {
 return(
  <>
    <NavBar />
    <main style={{padding:"1rem"}}>
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='post/:id' element={<PostDetails/>}/>
        <Route path='about'  element={<About/>}/>
      </Routes>
    </main>
  </>
 )
}

export default App

import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Main from './components/Main'
import { AuthProvider } from './components/context/AuthContext'

function App() {
 return(
  <AuthProvider>
    <div style={{fontFamily:"Arial ,sans-serif"}}>
      <Navbar />
      <Main />
      <Footer />
    </div>
  </AuthProvider>
 );
}

export default App

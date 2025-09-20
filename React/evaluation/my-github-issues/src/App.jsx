import { useState } from 'react'
import { Route, Routes, Link } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import IssuesPage from './pages/IssuesPage'

function App() {
  return(
    <div>
      <header style={{padding: 12, borderBottom: '1px solid #ddd'}}>
        <Link to="/">
          masai . repo-issues
        </Link>
      </header>

      <main >
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/repo/:owner/:repoName' element={<IssuesPage/>}/>
        </Routes>
      </main>
    </div>
  )
}

export default App

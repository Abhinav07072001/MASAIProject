import { useState } from 'react'
import { samplePhotos } from './data/samplePhotos';
import Gallery from './components/Gallery';
import Controls from './components/Controls';
import Modal from './components/Modal';
import './App.css'

function App() {
  const [active, setActive]= useState(null);

  return(
    <div className='container'>
      <header className='topbar'>
        <h1>Dyanmic & Responsive Photo Gallery</h1>
      </header>


      <Gallery photos={samplePhotos} onOpen={setActive}/>

      <Modal photo={active} onClose={()=>setActive(null)} />
    </div>
  )
}

export default App

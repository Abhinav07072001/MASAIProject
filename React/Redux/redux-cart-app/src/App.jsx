import { useState } from 'react'
import './App.css'
import ProductList from './components/ProducList.jsx'
import Cart from './components/Cart.jsx'
function App() {
  return(
    <div style={{ display: "flex", justifyContent: "space-around", marginTop: "50px" }}>
       <ProductList />
       <Cart />
    </div>
  );
}

export default App

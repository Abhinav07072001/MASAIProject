import { useState } from 'react'
import ProductList from './components/ProductList'
import Cart from './components/Cart'
import './App.css'

function App() {
  return(
    <div className='container'>
       <h1>🛍 Shopping Cart with API + Redux</h1>
        <div className="content">
        <ProductList />
        <Cart />
      </div>
    </div>
    
  );
}

export default App

import { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { fetchProducts } from './features/productSlice';
import './App.css'

function App() {
  const dispatch= useDispatch();
  
  // redux state ko read karo
  const {items, status, error}=useSelector((state)=>state.products);

  useEffect(()=>{
    // jab component mount ho, API call karo
    if(status==="idle"){
      
      dispatch(fetchProducts());
    }
  },[status, dispatch]);
  
  if(status==="loading") return <h2>Lodaing...</h2>
  if(status==="failed") return <h2>Error: {error}</h2>

  return(
     <div style={{ padding: "20px" }}>
      <h1>🛒 Product List</h1>
      <ul>
        {items.map((p) => (
          <li key={p.id}>
            {p.title} - ${p.price}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App

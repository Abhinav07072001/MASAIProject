import { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { increment, decrement } from './features/counterSlice.js'
import './App.css'

function App() {
  const count=useSelector((state)=>state.counter.value);
  const dispatch = useDispatch();
  return(
    <div style={{textAlign:"center", marginTop:"50px"}}>
      <h1>Counter App</h1>
      <h2>{count}</h2> 
      <button onClick={()=>dispatch(increment())} 
        style={{margin:"10px", borderRadius:"6px"}}>
          Increment
          </button>
      <button onClick={()=>dispatch(decrement())}>Decrement</button>

    </div>
  )
  
}

export default App

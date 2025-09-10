import { useState } from "react";

export default function Counter(){
    const [count, setCount]= useState(0);

    function Increment(){
        console.log("Increment is", count)
        setCount(count+1);
    }

     function Decrement(){
        if(count>0){
            setCount(count - 1);
        }
        
    }

     function Reset(){
        setCount(0);
    }

    return(
        <div style={{textAlign:"center", marginTop:"20px"}}>
            <h1>Counter App</h1>
            <h3>{count}</h3>

            <button onClick={Increment}
            style={{border:"1px solid black",
                borderRadius:"6px",
                background:"black",
                margin:"8px",
                padding:"12px",
            }}>Increment</button>

            <button onClick={Decrement}
            style={{
                border:"1px solid black",
                borderRadius:"6px",
                background:"black",
                margin:"8px",
                padding:"12px",
            }}>Decrement</button>

            <button onClick={Reset}
            style={{
                border:"1px solid black",
                borderRadius:"6px",
                background:"black",
                margin:"8px",
                padding:"12px",
            }}
            >Reset</button>
        </div>
    );
}
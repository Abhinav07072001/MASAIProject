import React, { useState } from "react";

function Accordian({faqs}){

    // multi -open krna ka liya state
    const [openIndexes, setOpenIndexes]=useState([]);

    function toggleIndexes(i){
        setOpenIndexes((prev)=>{
            if(prev.includes(i)){
                // agar hai to remove krdo jisa band ho jayega
                return prev.filter((index)=> index!== i);
            }
            else{
                // agar band hai to add krdo open ho jayega
                return [...prev, i];    
            }
            
        });
    }

    return(
        <div>
            {faqs.map((faq,i)=>(
                <div key={i} 
                style={{
                    border:"1px solid #ddd", 
                    marginBottom:"10px", 
                    padding:"10px"}}>
                 {/* Question clickable */}
                 <div onClick={()=> toggleIndexes(i)}
                    style={{cursor:"pointer", 
                        fontWeight:"bold",
                        display:"flex",
                        justifyContent:"space-between",
                        alignItems:"center"}}>
                        
                        <span>{openIndexes.includes(i)? "-": "+"}</span>
                        {faq.question}
                        
                    </div>

                 {/* answer clickable */}
                 {openIndexes.includes(i) && (
                    <div style={{marginTop:"5px", 
                        color:"#333",
                        borderRadius:"4px",
                        background:"#f9f9f9",
                        padding:"8px",
                        }}>
                        {faq.answer}
                    </div>
                 )}
                </div>
            ))}
        </div>
    );
}

export default Accordian;
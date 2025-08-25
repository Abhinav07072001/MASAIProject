import React from "react";

export default function UserCard({name, email , city}){
    return(
        <div 
         style={{border:"1px solid #ccc",
           borderRadius:"20px",
           padding:"12px",
           marginBottom:"10px",
            background: "#f9f9f9" 
         }}
        >
            <h2>{name}</h2>
            <p><strong>{email}</strong></p>
            <p><strong>{city}</strong></p>
        </div>
    );
}
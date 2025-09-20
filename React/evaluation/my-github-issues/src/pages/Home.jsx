import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(){
    const [val, setVal]=useState('')
    const navigate=useNavigate()

    function onSubmit(e){
        e.preventDefault()
        const trimmed = val.trim()
        if(!trimmed){
            alert('Please enter owner/repo')
            return
        }
        const parts= trimmed.split('/')
        if(parts.length!==2){
            alert('Enter in owner/repo format, Example: facebool/react')
            return

        }
        const [owner, repoName]= parts
        navigate(`/repo/${owner}/${repoName}`)
    }
    return(
        <div style={{maxWidth:800 , margin: '0 auto'}}>
            <h1>Repository Search</h1>
            <form onSubmit={onSubmit} style={{display:'flex', gap:8, marginTop:12,}}>
                <input 
                value={val}
                onChange={(e)=> setVal(e.target.value)}
                placeholder="owner/repo"
                style={{flex:1, padding:10, fontSize: 16}}
                />

                <button type="sub,it"
                style={{padding: '10px 14px'}}>Go </button>
            </form>

            <p style={{marginTop:10, color:'#666'}}>
                Example repos: <code>facebool/react</code>, <code>vercel/next.js</code>
            </p>

        </div>
    )
}
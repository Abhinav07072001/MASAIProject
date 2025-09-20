import React from "react";
 export default function FilterControls({filters, dispatch}){
    return(
        <div style={{display:'flex', gap:12, alignItems:'center', marginTop:12}}>
            <label >
                State:
                <select 
                value={filters.status}
                onChange={e=>dispatch({type: 'SET_STATUS', payload:e.target.value})}>
                    <option value="open">open</option>
                    <option value="closed">closed</option>
                    <option value="all">all</option>
                </select>
            </label>

            <label>
                Label:
                <input type="text" 
                value={filters.label}
                onChange={e=> dispatch({type:'SET_LABEL', payload:e.target.value})}
                placeholder="e.g. bug"
                style={{marginLeft:8}}
                />
            </label>

            <button onClick={()=> dispatch({type:'RESET'})}>Reset</button>
        </div>
    )
 }
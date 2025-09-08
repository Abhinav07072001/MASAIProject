import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";

function Search(){
    const [query, setQuery]= useState("");
    const debouncedQuery= useDebounce(query, 500); //wait 500ms after typing

    useEffect(()=>{
        if(debouncedQuery){
            console.log("API calling here", debouncedQuery);
            
            // yaha tum API call karoge:
            // fetch(`https://api.example.com/search?q=${debouncedQuery}`)

        }
    }, [debouncedQuery])

    return(
        <div>
            <h2>Debounced Query</h2>
            <input 
            type="text" 
            placeholder="Enter Here..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            />

            <p>Search Term : {debouncedQuery}</p>
        </div>
    );
}
export default Search;
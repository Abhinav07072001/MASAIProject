import { useEffect,useState } from "react";
import {useNavigate} from "react-router-dom"

export default function SearchBox(){
    const [query, setQuery]=useState("");
    const navigate= useNavigate();

    const handleSubmit=(e)=>{
        e.preventDefault();

        const city= query.trim();
        if(!city) return ;
        navigate(`weather/${encodeURIComponent(city)}`);
    };
    return(
        <form onSubmit={handleSubmit}>
            <div className="inputRow">
                <input 
                placeholder="Enter a city , e.g., Mumbai" 
                value={query} 
                onChange={(e)=> setQuery(e.target.value)}
                aria-label="City name"
                />
                <button type="submit">Search</button>
            </div>
            <p className="small">Tip: You can also press Enter to search.</p>
        </form>
    );
}
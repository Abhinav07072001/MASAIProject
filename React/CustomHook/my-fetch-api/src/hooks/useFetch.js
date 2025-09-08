import { useState, useEffect } from "react";

function useFetch(url){
    const [data, setData]=useState([]);
    const [lodaing, setLodaing]=useState(true);

    useEffect(()=>{
        fetch(url)
        .then(res=>res.json())
        .then(data=>{
            setData(data);
            setLodaing(false);
        })
    },[url])
    
    return {data, lodaing};
    
}
export default useFetch;
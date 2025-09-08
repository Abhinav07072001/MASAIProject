import { useState, useEffect } from "react";

function useDebounce(value, delay){
    const [debounceValue, setDebounceValue]= useState(value);

    useEffect(()=>{
        const handler=setTimeout(()=>{
            setDebounceValue(value);
        },delay);

        return ()=>{
            clearTimeout(handler); //cleanup agar value fir se change ho jaye delay ke andar
        };
    },[value, delay])

    return debounceValue;
}
export default useDebounce;
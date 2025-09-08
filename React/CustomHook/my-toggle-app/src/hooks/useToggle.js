import { useState } from "react";

function useToggle(intialValue, intialPosition=0){
    const [index, setIndex]=useState(intialPosition);

    const currentItem= intialValue[index];

    const toggle=()=>{
        setIndex((prevIndex)=>(prevIndex+1)% intialValue.length);
    };

    return [ currentItem, toggle];
}
export default useToggle;
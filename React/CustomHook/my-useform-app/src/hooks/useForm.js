import { useState, useEffect } from "react";

function useForm(initialValue){
    const [values, setValues]= useState(initialValue);

    const handleChange=(e)=>{
        setValues({
            ...values,
            [e.target.name]: [e.target.value]
        });
    };

    const resetForm=()=>{
        setValues(initialValue);
    };

    return {values, handleChange, resetForm };
}
export default useForm;
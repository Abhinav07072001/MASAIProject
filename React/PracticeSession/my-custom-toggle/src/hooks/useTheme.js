import { useState,useEffect } from "react";

export function useTheme(){
    // intial state from localStorage or bydefault "light"
    const [theme, setTheme]=useState(()=>{
        const saved= localStorage.getItem("theme");
        return saved ? saved: "light"
    })

    // Toggle Function
    const toggleTheme=()=>{
        setTheme((prev)=>(prev==="light"?"dark": "light"));
    };

    // for persist values when reload page
    useEffect(()=>{
        localStorage.setItem("theme",theme);
    },[theme])

    // return values
    return {theme, toggleTheme};
}
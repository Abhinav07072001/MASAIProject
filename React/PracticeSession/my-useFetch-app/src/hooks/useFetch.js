import {useState,useEffect, useReducer} from 'react'

function fetchReducer(state, action){
    switch(action.type){
        case "FETCH_START":
            return{data:null, loading:true, error:null};
        case "FETCH_SUCCESS":
            return{data:action.payload, loading:false, error:null};
        case "FETCH_ERROR":
            return{data:null, loading:false, error:action.payload};
        default:
            return state;        
    }
}

export function useFetch(url){
    const [state, dispatch]= useReducer(fetchReducer,{
        data:null,
        loading:true,
        error:null,
    });
    useEffect(()=>{
        let isMounted=true;
        dispatch({type: "FETCH_START"});
        
        fetch(url)
        .then((res)=>{
            if(!res.ok) throw new Error ("Network response not ok !");
            return res.json();
        })
        .then((data)=>{
            if(isMounted){
                dispatch({type: "FETCH_SUCCESS" , payload:data});
            }
        })
        .catch((error)=>{
            if(isMounted){
                dispatch({type: "FETCH_ERROR", payload:error.message});
            }
        });

        return ()=>{
            isMounted=false;
        };
    },[url])

    return state // { data, loading, error}
}
import { useEffect } from "react";
import { useReducer } from "react";

const initialState={
    loading: false,
    data:[],
    error:"",
};
function reducer(state, action){
    switch(action.type){
        case "FETCH_START":
            return {...state, loading:true,error:"" };
        case "FETCH_SUCCESS":
            return{loading:false,data:action.payload, error:""};
        case "FETCH_ERROR":
            return{loading:false,data:[], error:action.payload} ;
        default:
            return state;       
    }
}

export default function UserList(){
    const [state, dispatch]= useReducer(reducer, initialState);

    useEffect(()=>{
        dispatch({type: "FETCH_START"});

        fetch("https://jsonplaceholder.typicode.com/users")
        .then((res)=>res.json())
        .then((data)=>{
            dispatch({type: "FETCH_SUCCESS", payload:data});
        })
        .catch((error)=>{
            dispatch({type:"FETCH_ERROR", payload:error.message});
        })
    },[]);
    return(
        <div>
            <h2>User List</h2>
            {state.loading && <p>Loading...</p>}
            {state.error && <p style={{color:"red",border:"1px solid red", borderRadius:"6px"}}>
                Error: {state.error}
                </p>}
            <ul>
                {state.data.map((user)=>(
                <li key={user.id}>
                    {user.name} -{user.email}
                </li>
            ))}    
            </ul>    

        </div>
    )
}
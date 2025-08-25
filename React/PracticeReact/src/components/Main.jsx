import React from "react";
import { useAuth } from "./context/AuthContext";

function Main(){
    const {isLoggedIn, toggleAuth}=useAuth();

    return(
        <main style={{padding:"20px", textAlign:"center"}}>
            {isLoggedIn ? (
                <h2>Welcome Back  . You are logged In</h2>
            ): (
                <h2>Please Log In to continue</h2>
            )}
        </main>
    );
}

export default Main;

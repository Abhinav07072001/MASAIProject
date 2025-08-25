import React from "react";
import { useAuth } from "./context/AuthContext";

function Navbar(){
    const {isLoggedIn, toggleAuth}= useAuth();

    return(
        <nav style={{padding:"10px",background:"#eee"}}>
            <button onClick={toggleAuth}>
                {isLoggedIn? "Logout": "LogIn"}
            </button>
        </nav>
    );
}

export default Navbar;
import React from "react";

import { useAuth } from "./context/AuthContext";

function Footer(){
    const {isLoggedIn, toggleAuth}=useAuth();

    return(
        <footer style={{padding: "10px", background: "#ddd", textAlign: "center"}}>
            {isLoggedIn ?(
                <h2>Thanks for visiting our app</h2>
            ): (
                <h2>You are currently log out</h2>
            )}
        </footer>
    );
}

export default Footer
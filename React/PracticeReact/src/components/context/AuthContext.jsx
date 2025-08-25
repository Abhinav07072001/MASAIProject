import React, { useContext } from "react";

const AuthContext=React.createContext();

export function AuthProvider({children}){
    const [isLoggedIn, setLoggedIn]=React.useState(false);

    const toggleAuth = ()=>{
        setLoggedIn((prev)=>!prev);
    };

    return(
        <AuthContext.Provider value={{isLoggedIn, toggleAuth}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(){
    return useContext(AuthContext);
}
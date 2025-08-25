import React, { Children } from "react";

const ThemeContext= React.createContext();

export function ThemeProvider({children}){
    const [theme, setTheme]=React.useState("light");

    const toggle=()=>setTheme(t=> t==="light" ? "dark": "light");

    return(
        <ThemeContext.Provider value={{theme, toggle}}>
            {children}
        </ThemeContext.Provider>
    );
}

// Custom hook for easy usage
export function useTheme(){
    return React.useContext(ThemeContext);
}
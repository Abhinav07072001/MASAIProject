import { useTheme } from "../../context/theme-context.jsx";

export default function ThemeToggleButton(){
    const {theme, toggle}= useTheme();

const styles={
      backgroundColor: theme === "light" ? "#fff" : "#333",
    color: theme === "light" ? "#000" : "#fff",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
}

return(
    <button style={styles} onClick={ThemeToggleButton}>
        Switch to {theme === "light" ? "Dark" : "Light"} Mode
    </button>
);
}
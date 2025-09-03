import { NavLink } from "react-router-dom";

const linkStyle=({isActive})=>({
    marginRight:12,
    textDecoration :isActive? 'underline': 'none'
})

export default function NavBar(){
    return(
        <nav style={{padding: '0.75rem 1rem', borderBottom: '1px solid #ddd'}}>
            <NavLink to='/' style={linkStyle}>Home</NavLink>
            <NavLink to='/about' style={linkStyle}>About</NavLink>
        </nav>
    )
}
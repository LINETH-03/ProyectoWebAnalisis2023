import { NavLink, Outlet } from "react-router-dom"

export const Layout =()=>{

    return(
        <div>
            <NavLink to="/Users">
                Usuarios
            </NavLink>
            
            <NavLink to="/Login">
                Login
            </NavLink>
           
            
            <Outlet/>
        </div>
    )
}
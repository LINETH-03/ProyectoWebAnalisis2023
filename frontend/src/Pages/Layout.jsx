import { NavLink, Outlet } from "react-router-dom"

export const Layout =()=>{

    return(
        <div>
        <div class="w3-bar w3-indigo">
            <NavLink className="w3-bar-item w3-button" to="/Users">
                Mantenimiento
            </NavLink>
            <NavLink  className="w3-bar-item w3-button" to="/Login">
                Inicio de sesion
            </NavLink>
           
        </div>  
            <Outlet/>
        </div>
    )
}
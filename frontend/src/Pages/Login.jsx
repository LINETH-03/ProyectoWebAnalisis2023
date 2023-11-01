import { useState } from 'react'
//import './Login.css' // Importa tu archivo CSS

export const Login = () => {
const [user, setUser] = useState({
    Correo: '',
    pass: '',
 })

  
  const valueHasChanged = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const loginClick = async(e)=>{
    e.preventDefault()
  }
  return (
    <main className="w3-cell-row w3-margin-top">
      <div className="w3-container w3-cell"></div>

      <div className="w3-container w3-light-grey w3-cell w3-cell-middle  ">
        <form className="w3-container w3-margin-top w3-margin-bottom "
              onSubmit={loginClick}
        >
            <h4>Ingreso a Gestor de Fiananzas</h4>
          <label htmlFor="Correo">Correo electrónico</label>
          <input
            type="text"
            id="Correo"
            name="Correo"
            className="w3-input"
            value={user.Correo}
            onChange={valueHasChanged}
          />
          <label htmlFor="pass">Contrasenia</label>
          <input
            type="password"
            id="pass"
            name="pass"
            className="w3-input"
            value={user.pass}
            onChange={valueHasChanged}
          />
          <button type="submit" className="w3-button w3-blue w3-margin-top" >Ingresar</button>
        </form>
      </div>

      <div className="w3-container  w3-cell w3-cell-bottom"></div>
    </main>
  )
}

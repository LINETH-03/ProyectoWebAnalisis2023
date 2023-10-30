import { useState } from 'react'
import { API_ENDPOINT } from '../config/consts'
import {useNavigate} from 'react-router-dom'
import { toast } from 'react-toastify';
export const Login = () => {

  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    pass: '',
  })

  
  const valueHasChanged = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    })
  }

  const loginClick = async (e) =>{
    e.preventDefault()
    try{
      let response = await fetch(API_ENDPOINT + "/auth/login", {
        method: "POST",
       
        credentials:'include',
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify(user)
      })
      let parsedResponse = await response.json()
      if (parsedResponse.id){
        sessionStorage.setItem('logged_user', JSON.stringify(parsedResponse))
        navigate("/Users")
      }
      else{
        toast.error(parsedResponse.message)
      }
    }
    
    catch(err){
      console.log(err)
      toast.error(err)
    }
  }
  return (
    <main className="w3-cell-row w3-margin-top">
      <div className="w3-container w3-cell"></div>

      <div className="w3-container w3-light-grey w3-cell w3-cell-middle  ">
        <form className="w3-container w3-margin-top w3-margin-bottom "
              onSubmit={loginClick}
        >
            <h4>Ingreso al Sistema UMG</h4>
          <label htmlFor="email">Correo electrónico</label>
          <input
            type="text"
            id="email"
            name="email"
            className="w3-input"
            value={user.email}
            onChange={valueHasChanged}
          />
          <label htmlFor="email">Password</label>
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

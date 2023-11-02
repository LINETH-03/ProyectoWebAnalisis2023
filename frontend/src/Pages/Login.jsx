import { useState } from 'react'
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const history = useNavigate();

  const [user, setUser] = useState({
    Correo: '',
    pass: '',
  });

  const valueHasChanged = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loginClick = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8080/auth/login', { // Modifica esta línea
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ Correo: user.Correo, pass: user.pass })
      });

      const data = await response.json();

      if (data.success) {
        alert(data.message); // Autenticación exitosa (puedes redirigir al usuario a otra página aquí)
        history('/Menu'); // Redirige al usuario a la página de dashboard después de iniciar sesión
      } else {
        alert(data.message); // Autenticación fallida
      }
    } catch (error) {
      console.error(error);
      alert('Error en la autenticación');
    }
  };

  return (
    <main className="w3-cell-row w3-margin-top">
      <div className="w3-container w3-cell"></div>

      <div className="w3-container w3-light-grey w3-cell w3-cell-middle  ">
        <form className="w3-container w3-margin-top w3-margin-bottom "
              onSubmit={loginClick}
        >
            <h4>Ingreso al Gestor de Finanzas Personales</h4>
          <label htmlFor="Correo">Correo electrónico</label>
          <input
            type="text"
            id="Correo"
            name="Correo"
            className="w3-input"
            value={user.Correo}
            onChange={valueHasChanged}
          />
          <label htmlFor="pass">Contraseña</label>
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
  );
}
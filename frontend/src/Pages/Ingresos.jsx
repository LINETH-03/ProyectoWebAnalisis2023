import { useEffect, useState, useRef } from 'react'



export const Crearingrso = () => {
  const [authToken, setAuthToken] = useState(null);

  const ENDPOINT = "http://localhost:8080/Insertarusuario/ingresos";

  const login = async (credentials) => {
    try {
      const response = await fetch('http://localhost:8080/Insertarusuario/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (response.ok) {
        const data = await response.json();
        const { token } = data;
        setAuthToken(token); // Almacena el token en el estado
        // Realiza acciones adicionales después del inicio de sesión, si es necesario
      } else {
        // Maneja errores de inicio de sesión
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
    }
  };

  const [users, setUsers] = useState([])
  const dialogRef = useRef(null)
  const dialogDeleteRef = useRef(null)
  const [currentUser, setCurrentUser] = useState({
    Id_Ingreso:0,
    IdUsuario: 0,
    Cantidad: '',
    Fecha: '',
    Descripcion_Ingreso: '',
    Divisa: '',
  })

  const getAll =async ()=>{
    let fetchResp = await fetch(ENDPOINT)
    let dataJson = await fetchResp.json()
    setUsers(dataJson)
  }
  useEffect(() => {
    //useEffect vacio, significa que lo va ejecutar cuando se cargue el componente en memoria.
    (async () => {
        await getAll()
    })()
  }, [])

  const newUserClick = (e) => {
    e.preventDefault()
    dialogRef.current.showModal()
  }

  const closeNewUserModal = (e) => {
    e.preventDefault()
    dialogRef.current.close()
  }

  const valueHasChanged = (e) => {
    setCurrentUser({
      ...currentUser,
      [e.target.name]: e.target.value,
    })
  }

  const formSubmit = async (e) =>{
    e.preventDefault()
    if (currentUser.IdUsuario <= 0){
      //Create
      await postData(currentUser)
    }
    else{
      await updateData(currentUser)
    }
    setCurrentUser({
      Id_Ingreso:0,
      IdUsuario: 0,
      Cantidad: '',
      Fecha: '',
      Descripcion_Ingreso: '',
      Divisa: '',
    })
    dialogRef.current.close()
  }

  const postData = async (data) => {
    try {
      let fetchResp = await fetch(ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}` // Agrega el token de autenticación aquí
        },
        body: JSON.stringify(data)
      });
      let json = await fetchResp.json();
      await getAll();
    } catch (error) {
      console.error(error);
      // Maneja errores de manera adecuada
    }
  };


  const updateData = async (data) => {
    try {
      let fetchResp = await fetch(`${ENDPOINT}/${data.IdUsuario}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken}` // Agrega el token de autenticación aquí
        },
        body: JSON.stringify(data)
      });
      let json = await fetchResp.json();
      await getAll();
    } catch (error) {
      console.error(error);
      // Maneja errores de manera adecuada
    }
  };

  const deleteRow = async (row)=>{
    setCurrentUser(row)
    dialogDeleteRef.current.showModal()
  }

  const deleteData = async (row) =>{
    let fetchResp = await fetch(ENDPOINT + "/" + row.IdUsuario, {
      method: "DELETE",
      headers: {
          "Content-Type": "application/json"
      }
      })
      let json = await fetchResp.json()
      await getAll()
  }

  const confirmDelete = async(e)=>{
    e.preventDefault();
    await deleteData(currentUser)
    dialogDeleteRef.current.close()
  }

  const showEdit = (row)=>{
    setCurrentUser(row)
    dialogRef.current.showModal()
  }


  
  return (
    <>
      <dialog ref={dialogRef}>
        <h4>Nuevo Ingreso</h4>
        <form onSubmit={formSubmit} className="w3-container">
          <label htmlFor="Cantidad">Cantidad</label>
          <input
            type="number"  step="0.01"
            id="Cantidad"
            name="Cantidad"
            className="w3-input"
            value={currentUser.Cantidad}
            onChange={valueHasChanged}
          />
          <label htmlFor="Fecha">Fecha</label>
          <input
            type="date"  step="0.01"
            id="Fecha"
            name="Fecha"
            className="w3-input"
            value={currentUser.Fecha}
            onChange={valueHasChanged}
          />
          <label htmlFor="Descripcion_Ingreso">Descripcion</label>
          <input
            type="text"
            id="Descripcion_Ingreso"
            name="Descripcion_Ingreso"
            className="w3-input"
            value={currentUser.Descripcion_Ingreso}
            onChange={valueHasChanged}
          />
          <label htmlFor='Divisa'>Divisa</label>
          <select
           className='w3-select'
           name="Divisa"
           id="Divisa"
           value={currentUser.Estado}
           onChange={valueHasChanged}
          >
            <option>Seleccione</option>
            <option value="Q">Q.</option>
            <option value="$">$</option>
          </select>
          <div className="w3-row">
            <div className="w3-col m4">
              <button type="submit" className="w3-button w3-green">Guardar</button>         
            </div>
            <div className="w3-col m4">
              <button className="w3-button w3-red" onClick={closeNewUserModal}>Cerrar</button>
            </div>
          </div>
        </form>
      </dialog>
      <button onClick={newUserClick} >Nuevo Ingreso</button>
      <h1>Mantenimiento de usuarios</h1>
      <table className="w3-table w3-striped w3-bordered w3-border">
        <thead>
          <tr>
           <th>Id_Ingreso</th>
            <th>IdUsuario</th>
            <th>Cantidad</th>
            <th>Fecha</th>
            <th>Descripccion</th>
            <th>Divisa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={'user' + row.Id_Ingreso} style={{backgroundColor: row.Divisa === "Q" ? "olive": ""}}>
              <td>{row.Id_Ingreso}</td>
             <td>{row.IdUsuario}</td>
              <td>{row.Cantidad}</td>
              <td>{row.Fecha}</td>
              <td>{row.Descripcion_Ingreso}</td>
              <td>{row.Divisa}</td>
              <td>
                <button className="w3-button w3-yellow" onClick={(e)=> { showEdit(row) }}>Editar</button>
                <button className="w3-button w3-red" onClick={(e)=> {deleteRow(row)}}>Borrar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <dialog ref={dialogDeleteRef}>
        <h4>Confirmación de borrado</h4>
        <form onSubmit={confirmDelete} className="w3-container">
           
            Esta seguro que desea eliminar a {currentUser.IdUsuario}
            <div className='w3-row'>
              <div className='w3-col m6'>
                <button className="w3-button w3-red" type="submit">Confirmar</button>
              </div>
              <div className='w3-col m6'>
                  <button className="w3-button w3-blue" onClick={(e)=>{
                  e.preventDefault()
                  dialogDeleteRef.current.close()
                }} >Cancelar</button>
              </div>
            </div>
        </form>
      </dialog>
    </>
  )
}
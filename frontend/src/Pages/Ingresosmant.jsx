import { useEffect, useState, useRef } from 'react'
import { API_ENDPOINT } from '../config/consts'


export const Ingresosmant = () => {

 

  const [users, setUsers] = useState([])
  const dialogRef = useRef(null)
  const dialogDeleteRef = useRef(null)
  //const [userIdFromCookie, setUserIdFromCookie] = useState(null);

  const [currentUser, setCurrentUser] = useState({
    Id_Ingreso:0,
    IdUsuario: 0,
    Cantidad: '',
    Fecha: '',
    Descripcion_Ingreso: '',
    Divisa: '',
  })

  const getAll =async ()=>{
    let fetchResp = await fetch(API_ENDPOINT + "/ingreso",)
    let dataJson = await fetchResp.json()
    setUsers(dataJson)
  }
  useEffect(() => {
    //useEffect vacio, significa que lo va ejecutar cuando se cargue el componente en memoria.
    (async () => {
        await getAll()
    })()
  }, [])



 /*useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/auth/userId", {
          credentials: 'include', // Esta opción envía las cookies en la solicitud
        });
        const data = await response.json();
        if (data.success) {
          setCurrentUser(prevState => ({
            ...prevState,
            IdUsuario: data.userId
          }));
          // Aquí puedes hacer lo que necesites con el ID_Usuario obtenido
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error al obtener el ID_Usuario:', error);
      }
    };
  
    fetchUserId();
  }, []); */


  /*useEffect(() => {
    const fetchUserId = async () => {
      try {
        const response = await fetch(API_ENDPOINT + "/auth/userId", {
          credentials: 'include', // Esta opción envía las cookies en la solicitud
        });
        const data = await response.json();
        if (data.success) {
          setUserIdFromCookie(data.userId); // Almacena el valor del IdUsuario en el estado
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error al obtener el ID_Usuario:', error);
      }
    };
  
    fetchUserId();
  }, []);*/
  


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
    if (currentUser.Id_Ingreso <= 0){
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

  const postData = async (data)=>{
    let fetchResp = await fetch(API_ENDPOINT + "/ingreso", {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }


  const updateData = async (data)=>{
    let fetchResp = await fetch(API_ENDPOINT + "/ingreso/" +  data.Id_Ingreso, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
      })
      let json = await fetchResp.json()
      await getAll()
  }

  const deleteRow = async (row)=>{
    setCurrentUser(row)
    dialogDeleteRef.current.showModal()
  }

  const deleteData = async (row) =>{
    let fetchResp = await fetch(API_ENDPOINT + "/ingreso/" +  row.Id_Ingreso, {
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
        <h4>Nuevo INGRESO</h4>
        <form onSubmit={formSubmit} className="w3-container">
          <label htmlFor="IdUsuario">IdUsuario</label>
          <input
            type="number"
            id="IdUsuario"
            name="IdUsuario"
            className="w3-input"
            value={currentUser.IdUsuario}
            onChange={valueHasChanged}
            //value={userIdFromCookie || ''} // Usa el valor del estado como valor inicial del campo
           // onChange={valueHasChanged}
          />
          <label htmlFor="Cantidad">Cantidad</label>
          <input
            type="number"
            id="Cantidad"
            name="Cantidad"
            className="w3-input"
            value={currentUser.Cantidad}
            onChange={valueHasChanged}
          />
          <label htmlFor="Fecha">Fecha</label>
          <input
            type="Date"
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
           value={currentUser.Divisa}
           onChange={valueHasChanged}
          >
            <option>Seleccione</option>
            <option value="Q">Quetzal</option>
            <option value="D">Dollar</option>
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
      <button onClick={newUserClick} >Nuevo INGRESO</button>
      <h1>INGRESOS</h1>
      <table className="w3-table w3-striped w3-bordered w3-border">
        <thead>
          <tr>
            <th>IdIngreso</th>
            <th>IdUsuario</th>
            <th>Cantidad</th>
            <th>Fecha</th>

            <th>Descripcion</th>
            <th>Divisa</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((row) => (
            <tr key={'user' + row.Id_Ingreso} style={{backgroundColor: row.Divisa === "I" ? "olive": ""}}>
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
           
            Esta seguro que desea eliminar a {currentUser.Id_Ingreso}
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
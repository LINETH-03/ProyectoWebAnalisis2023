const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")
/* GET users listing. */
router.get('/', async (req, res, next)=> {
  let data = []

  try{
    //Abrimos la conexion
    await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await sql.query("SELECT IdUsuario, Nombres, Correo, Contraseña, Estado FROM CrearUsuario")
    data = resultado.recordset
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});


router.post("/", async (req, res, next)=>{
  const user = req.body;
  let resultado = {}
  try{
    let connection = await sql.connect(config)
    const result = await connection
                              .request()
                              .input("Nombres", sql.VarChar, user.Nombres)
                              .input("Correo", sql.VarChar, user.Correo)
                              .input("Contraseña", sql.VarChar, user.Contraseña)
                              .input("Estado", sql.VarChar, user.Estado)
                            
                              .query("INSERT INTO CrearUsuario(Nombres, Correo, Contraseña, Estado) VALUES (@Nombres,@Correo,@Contraseña,@Estado)")
    resultado = result.rowsAffected
    //await connection.close()                          
  }
  catch(err){
    console.error(err)
    res.statusCode = 500
    resultado = err
  }
  res.send(resultado)
});

router.get('/:IdUsuario', async (req, res, next)=> {
  let data = {}
  
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("IdUsuario", sql.Int, req.params.IdUsuario)
                        .query("SELECT IdUsuario, Nombres, Correo, Contraseña, Estado FROM CrearUsuario WHERE IdUsuario = @IdUsuario")
    data = resultado.recordset[0]
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});

router.put('/:IdUsuario', async (req, res, next)=> {
  let data = {}
  let {name, pass, email, status} = req.body
  //user.name, user.pass, user.email
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("IdUsuario", sql.Int, req.params.IdUsuario)
                        .query("SELECT IdUsuario, Nombres, Correo, Contraseña, Estado FROM CrearUsuario WHERE  IdUsuario = @ IdUsuario")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("Nombres", sql.VarChar, Nombre)
      .input("Correo", sql.VarChar, Correo)
      .input("Contraseña", sql.VarChar, Contraseña)
      .input("id", sql.Int, req.params.IdUsuario)
      .input("Estado", sql.VarChar,Estado)
      .query("UPDATE CrearUsuario SET Nombres=@Nombres, Correo=@Correo, Contraseña=@email, Estado=@Estado WHERE IdUsuario=@IdUsuario")
       data = result.rowsAffected
    }
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});



router.delete('/:IdUsuario', async (req, res, next)=> {
  let data = {}
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("IdUsuario", sql.Int, req.params.IdUsuario)
                        .query("SELECT IdUsuario FROM CrearUsuario WHERE IdUsuario = @IdUsuario")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("IdUsuario", sql.Int, req.params.IdUsuario)
      .query("DELETE from CrearUsuario where IdUsuario=@IdUsuario")
       data = result.rowsAffected
    }
    //await sql.close()

  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send(data)
});




module.exports = router;
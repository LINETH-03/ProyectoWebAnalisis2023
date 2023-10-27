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
    const resultado = await sql.query("SELECT Id, IdUsuario, Cantidad, Fecha_Retiro, Descripcion_Retiro FROM Retiros")
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

//post
router.post("/", async (req, res, next)=>{
  const user = req.body;
  let resultado = {}
  try{
    let connection = await sql.connect(config)
    const result = await connection
                              .request()
                              .input("IdUsuario", sql.Int, user.IdUsuario)
                              .input("Cantidad", sql.Float, user.Cantidad)
                              .input("Fecha_Retiro", sql.Date, user.Fecha_Retiro)
                              .input("Descripcion_Retiro", sql.VarChar, user.Descripcion_Retiro)
                              
                            
                              .query("INSERT INTO Retiros(IdUsuario, Cantidad, Fecha_Retiro, Descripcion_Retiro) VALUES (@IdUsuario, @Cantidad, @Fecha_Retiro, @Descripcion_Retiro)")
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

//getbyID
router.get('/:Id', async (req, res, next)=> {
  let data = {}
  
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("Id", sql.Int, req.params.Id)
                        .query("SELECT  Id, IdUsuario, Cantidad, Fecha_Retiro, Descripcion_Retiro FROM Retiros WHERE  Id = @Id")
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

router.put('/:Id', async (req, res, next)=> {
  let data = {}
  let {IdUsuario, Cantidad, Fecha_Retiro, Descripcion_Retiro} = req.body
  //user.name, user.pass, user.email
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("Id", sql.Int, req.params.Id)
                        .query("SELECT Id, IdUsuario, Cantidad, Fecha_Retiro, Descripcion_Retiro FROM Retiros WHERE  Id = @Id")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("IdUsuario", sql.Int,IdUsuario)
      .input("Cantidad", sql.Float,Cantidad)
      .input("Fecha_Retiro", sql.Date,Fecha_Retiro)
      .input("Id", sql.Int, req.params.Id)
      .input("Descripcion_Retiro", sql.VarChar,Descripcion_Retiro)

      .query("UPDATE Retiros SET IdUsuario = @IdUsuario, Cantidad = @Cantidad, Fecha_Retiro = @Fecha_Retiro, Descripcion_Retiro = @Descripcion_Retiro WHERE Id = @Id")
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



router.delete('/:Id_Ingreso', async (req, res, next)=> {
  let data = {}
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("Id_Ingreso", sql.Int, req.params.Id_Ingreso)
                        .query("SELECT Id_Ingreso FROM Ingreso WHERE Id_Ingreso = @Id_Ingreso")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("Id_Ingreso", sql.Int, req.params.Id_Ingreso)
      .query("DELETE from Ingreso where Id_Ingreso=@Id_Ingreso")
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
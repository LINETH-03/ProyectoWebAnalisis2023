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
    const resultado = await sql.query("SELECT Id_Informe, IdUsuario, Fecha_Informe, Descripcion, SumaIngresos, SumaRetiros, CantidadTotal FROM Informe")
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
                              .input("IdUsuario", sql.Int, user.IdUsuario)
                              .input("Fecha_Informe", sql.Date, user.Fecha_Informe)
                              .input("Descripcion", sql.VarChar, user.Descripcion)
                              .input("SumaIngresos", sql.Float, user.SumaIngresos)
                              .input("SumaRetiros", sql.Float, user.SumaRetiros)
                              .input("CantidadTotal", sql.Float, user.CantidadTotal)
                              .query("INSERT INTO Informe(IdUsuario, Fecha_Informe, Descripcion, SumaIngresos, SumaRetiros, CantidadTotal) VALUES (@IdUsuario, @Fecha_Informe, @Descripcion, @SumaIngresos,@SumaRetiros, @CantidadTotal)")
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

router.get('/:Id_Informe', async (req, res, next)=> {
  let data = {}
  
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("Id_Informe", sql.Int, req.params.Id_Informe)
                        .query("SELECT Id_Informe, IdUsuario, Fecha_Informe, Descripcion, SumaIngresos, SumaRetiros, CantidadTotal FROM Informe WHERE Id_Informe = @Id_Informe")
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


router.put('/:Id_Informe', async (req, res, next)=> {
  let data = {}
  let { IdUsuario, Fecha_Informe, Descripcion, SumaIngresos, SumaRetiros, CantidadTotal} = req.body
  //user.name, user.pass, user.email
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("Id_Informe", sql.Int, req.params.Id_Informe)
                        .query("SELECT IdUsuario, IdUsuario, Fecha_Informe, Descripcion, SumaIngresos, SumaRetiros, CantidadTotal FROM Informe WHERE Id_Informe = @Id_Informe")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("IdUsuario", sql.Int,IdUsuario)
      .input("Fecha_Informe", sql.Date,Fecha_Informe)
      .input("Descripcion", sql.VarChar,Descripcion)
      .input("Id_Informe", sql.Int, req.params.Id_Informe)
      .input("SumaIngresos", sql.Float,SumaIngresos)
      .input("SumaRetiros", sql.Float,SumaRetiros)
      .input("CantidadTotal", sql.Float,CantidadTotal)
      .query("UPDATE Informe SET IdUsuario = @IdUsuario, Fecha_Informe = @Fecha_Informe, Descripcion = @Descripcion, SumaIngresos = @SumaIngresos, SumaRetiros = @SumaRetiros, CantidadTotal = @CantidadTotal WHERE Id_Informe = @Id_Informe")
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



router.delete('/:Id_Informe', async (req, res, next)=> {
  let data = {}
  try{
    //Abrimos la conexion
    const connection = await sql.connect(config)
    //ejecutamos la consulta
    const resultado = await connection.request()
                        .input("Id_Informe", sql.Int, req.params.Id_Informe)
                        .query("SELECT Id_Informe FROM Informe WHERE Id_Informe = @Id_Informe")
    if (resultado.recordset.length > 0){
      const result = await connection
      .request()
      .input("Id_Informe", sql.Int, req.params.Id_Informe)
      .query("DELETE from Informe where Id_Informe=@Id_Informe")
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
const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")
// auth.js
const jwt = require('jsonwebtoken');
const verificarToken = require('../middlewares/session_auth');
//const { secretKey } = require('../config/keys'); // Importa la clave secreta desde tu archivo de configuración

router.post('/login', async (req, res, next) => {
  const { Correo, pass } = req.body;

  try {
    // Abrimos la conexión a la base de datos
    let connection = await sql.connect(config);

    // Ejecutamos la consulta para buscar el usuario por correo y estado activo
    const result = await connection.request()
      .input("Correo", sql.VarChar, Correo)
      .query("SELECT IdUsuario, pass, Estado FROM CrearUsuario WHERE Correo = @Correo AND Estado = 'A'");

    // Si se encontró un usuario con el correo y estado activo
    if (result.recordset.length > 0) {
      const usuario = result.recordset[0];

      // Verificamos la contraseña
      if (usuario.pass === pass) {
        // Autenticación exitosa, generamos el token JWT
        const token = jwt.sign({ userId: usuario.IdUsuario }, process.env.secretKey);
        res.status(200).json({ success: true, message: 'Autenticación exitosa', token });
      } else {
        // Contraseña incorrecta
        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      // No se encontró un usuario con el correo proporcionado o estado inactivo
      res.status(404).json({ success: false, message: 'Usuario no encontrado o estado inactivo' });
    }
  } catch (error) {
    // Error en la consulta
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en la autenticación' });
  }
});

// Rutas protegidas con el middleware de verificación de token
router.get('/rutaProtegida', verificarToken, async (req, res, next) => {
  // req.userId contiene el IdUsuario extraído del token
  // Realiza las operaciones necesarias para esta ruta protegida
  res.status(200).json({ success: true, message: 'Ruta protegida accesible.' });
});




/*router.post('/login', async (req, res, next) => {
  const { Correo, pass } = req.body;

  try {
    // Abrimos la conexión a la base de datos
    let connection = await sql.connect(config);

    // Ejecutamos la consulta para buscar el usuario por correo y estado activo
    const result = await connection.request()
      .input("Correo", sql.VarChar, Correo)
      .query("SELECT IdUsuario, pass, Estado FROM CrearUsuario WHERE Correo = @Correo AND Estado = 'A'");

    // Si se encontró un usuario con el correo y estado activo
    if (result.recordset.length > 0) {
      const usuario = result.recordset[0];

      // Verificamos la contraseña
      if (usuario.pass === pass) {
        // Autenticación exitosa
        res.status(200).json({ success: true, message: 'Autenticación exitosa' });
      } else {
        // Contraseña incorrecta
        res.status(401).json({ success: false, message: 'Contraseña incorrecta' });
      }
    } else {
      // No se encontró un usuario con el correo proporcionado o estado inactivo
      res.status(404).json({ success: false, message: 'Usuario no encontrado o estado inactivo' });
    }
  } catch (error) {
    // Error en la consulta
    console.error(error);
    res.status(500).json({ success: false, message: 'Error en la autenticación' });
  }
});


//const { verifySession } = require('../middlewares/session_auth');
//const bcrypt = require('bcrypt')
//const saltRounds = 10;

/* GET users listing. */
/*
router.get("/", (req,res)=>{
  res.send("OK")
})*/
/*
router.post('/', async (req, res, next)=> {
  
  let {Correo,pass} = req.body
  let data = {}
  try{
    //Abrimos la conexion
    let connection = await sql.connect(config)
    //ejecutamos la consulta
    
    const resultado = await connection.request()

    .input("Correo", sql.VarChar, Correo)
    .query("SELECT IdUsuario, pass, status FROM Users WHERE Correo = @Correo AND Estado='A'")
    //.execute("dbo.usp_login")

    //const resultado = await sql.query("SELECT pass, status FROM Users WHERE email = @email AND status='A'")
    
    const usuario = resultado.recordset[0]
    if (!usuario){
      res.statusCode = 404
      return res.send("Usuario no existe")
    }
    if (!bcrypt.compareSync(pass, usuario.pass)){
      res.statusCode = 400
      return res.send("Contraseña incorrecta");
    }

    data = usuario.IdUsuario
    //Todo OK el usuario y contraseña son correctos
    req.session.user_id = data
  }
  catch(err){
    console.error(err)
    data = err
    res.statusCode = 500 //Internal server error
  }
  res.send({id: data})
});

*/

module.exports = router;



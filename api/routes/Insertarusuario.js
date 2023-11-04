const express = require('express');
const router = express.Router();
const sql = require('mssql')
const {config} = require("../config/sql_server")
//const { secretKey } = require('../config/keys');
const jwt = require('jsonwebtoken');
 

router.use(express.json());

// Middleware para verificar el token en las rutas protegidas.
function verificarToken(req, res, next) {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ error: 'Acceso denegado' });

  try {
    const verificado = jwt.verify(token, process.env.secretKey);
    req.userId = verificado.userId;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Token no válido' });
  }
}

router.post("/login", async (req, res) => {
  const { Correo, pass } = req.body;
  
  try {
    // Realizar la verificación del correo y la contraseña en tu tabla CrearUsuario.
    // Si el usuario se autentica correctamente, obtén el IdUsuario correspondiente.
    // Supongamos que el IdUsuario se almacena en una variable llamada userId.

    // Generar un token JWT con el IdUsuario.
    const token = jwt.sign({ userId }, process.env.secretKey);

    // Enviar el token como respuesta al cliente.
    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

router.use(verificarToken);

router.get('/ingresos', async (req, res) => {
  try {
    const connection = await sql.connect(config);
    const result = await connection.query(`SELECT * FROM Ingreso WHERE IdUsuario = ${req.userId}`);
    const ingresos = result.recordset;
    res.json(ingresos);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los ingresos' });
  }
});

router.post('/ingresos', async (req, res) => {
  const { Cantidad, Fecha, Descripcion_Ingreso, Divisa } = req.body;

  try {
    const connection = await sql.connect(config);
    await connection.query`
      INSERT INTO Ingreso (IdUsuario, Cantidad, Fecha, Descripcion_Ingreso, Divisa)
      VALUES (${req.userId}, ${Cantidad}, ${Fecha}, ${Descripcion_Ingreso}, ${Divisa})
    `;
    res.json({ mensaje: 'Ingreso creado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el ingreso' });
  }
});

router.put('/ingresos/:Id_Ingreso', async (req, res) => {
  const { Cantidad, Fecha, Descripcion_Ingreso, Divisa } = req.body;
  const { Id_Ingreso } = req.params;

  try {
    const connection = await sql.connect(config);
    await connection.query`
      UPDATE Ingreso
      SET Cantidad = ${Cantidad}, Fecha = ${Fecha}, Descripcion_Ingreso = ${Descripcion_Ingreso}, Divisa = ${Divisa}
      WHERE Id_Ingreso = ${Id_Ingreso} AND IdUsuario = ${req.userId}
    `;
    res.json({ mensaje: 'Ingreso actualizado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar el ingreso' });
  }
});

router.delete('/ingresos/:Id_Ingreso', async (req, res) => {
  const { Id_Ingreso } = req.params;

  try {
    const connection = await sql.connect(config);
    await connection.query`
      DELETE FROM Ingreso
      WHERE Id_Ingreso = ${Id_Ingreso} AND IdUsuario = ${req.userId}
    `;
    res.json({ mensaje: 'Ingreso eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar el ingreso' });
  }
});


  
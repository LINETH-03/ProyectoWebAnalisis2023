const jwt = require('jsonwebtoken');

const { secretKey } = require('../config/keys'); // Importa la clave secreta desde tu archivo de configuración

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

module.exports = verificarToken;

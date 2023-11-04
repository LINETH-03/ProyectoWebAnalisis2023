require('dotenv').config();const config = {
    server: process.env.SERVER,
    user: process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database: process.env.DB_NAME,

    /*server: "DESKTOP-1JFS3GR",
    user: "proyecto",
    password:"1234proyecto",
    database: "BDAnalisis_Sistemas",*/
    
    options: {
        trustServerCertificate: true
    }
}

module.exports.config = config;
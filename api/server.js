/*require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = require("./app")




var corsOptions = {
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8081"
  };
  
  app.use(cors(corsOptions));
  
  // parse requests of content-type - application/json
  app.use(express.json());
  
  // parse requests of content-type - application/x-www-form-urlencoded
  app.use(express.urlencoded({ extended: true }));

const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, ()=>{
    console.log("Server running in port 8080")
})*/

const app = require("./app")

app.listen(8080, ()=>{
    console.log("Server running in port 8080")
})
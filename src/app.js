const dotenv = require('dotenv/config.js')
const express = require("express");
const router = require("./routes/router")
const cors = require("cors");
// Conectara con la database y enviara lo console.log
require("./config/database");


const server = express()

const notFound = require("./middlewares/notFound.js")
const errorHandler = require("./middlewares/errorHandler")

// Necesario para que pueda recibir datos(en json) por medio del body en las solicitudes http
server.use(express.json())
// El cors debe ir antes de las rutas para que funcione correctamente
server.use(cors())

server.use("/api", router)

// Middlewares que manejaran los errores
server.use(notFound)
server.use(errorHandler)

server.listen(process.env.PORT , ()=>{
    console.log(`Servidor listo en puerto : ${process.env.PORT}`);
})
const express = require("express");
const router = require("./routes/router")
// Conectara con la database y enviara lo console.log
require("./config/database")

const server = express()

// Necesario para que pueda recibir datos(en json) por medio del body en las solicitudes http
server.use(express.json())

server.use("/api", router)

server.listen(4000, ()=>{
    console.log("Servidor listo en puerto : 4000");
})
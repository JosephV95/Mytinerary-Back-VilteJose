const express = require("express");
const router = require("./routes/router")

const app = express()

app.use("/api", router)

app.listen(4000, ()=>{
    console.log("Servidor listo en puerto : 4000");
})
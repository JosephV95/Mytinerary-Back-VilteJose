const mongoose = require("mongoose");

// la uri proviene del .env de Dotenv
mongoose.connect(process.env.URI_LINK)
.then(()=> console.log("Connect success to DataBase"))
.catch((err)=> console.log(err))
               


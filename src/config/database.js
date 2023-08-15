const mongoose = require("mongoose");

let uri_link = "mongodb+srv://JosephV:Fate321@cluster0.jqliveq.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri_link)
.then(()=> console.log("Connect success to DataBase"))
.catch((err)=> console.log(err))
               


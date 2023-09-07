const { Schema, model } = require("mongoose");

const schemaUser = new Schema({
    name: {type: String, required: true},
    lastname: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true} ,
    photo: {type: String, required: true} ,
    nation: {type: String, required: true}
})

const Users = model("Users", schemaUser)

module.exports = Users ;
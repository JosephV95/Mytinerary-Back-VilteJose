const { Schema, model } = require("mongoose");

const schemaUser = new Schema({
    name: {type: String, required: true},
    lastname: {type: String},
    email: {type: String, required: true},
    password: {type: String, required: true} ,
    photo: {type: String} ,
    nation: {type: String}
}, {
    timestamps: true
})

const Users = model("Users", schemaUser)

module.exports = Users ;
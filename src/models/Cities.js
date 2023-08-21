const {Schema, model} = require("mongoose");

const schemaCity = new Schema({
    nation: {type: String, required: true},
    city: {type: String, required: true},
    img: {type: String, required: true},
    description: {type: String}
})

// Aqui se definira como se llamara el modelo y que schema usara y asi lo interpretara la base de Datos.
const City = model("Cities", schemaCity)

module.exports = City;
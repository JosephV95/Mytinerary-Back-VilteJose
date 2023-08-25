const { Schema, model } = require("mongoose");

const schemaItinery = new Schema({
    name: {type: String, required: true},
    photo: {type: String, required: true},
    price: {type: Number, reuired: true},
    duration: {type: String, reuired: true},
    comments: {type: String, reuired: true}
})

const Itineraries = model("Itineraries", schemaItinery)

module.exports = Itineraries;
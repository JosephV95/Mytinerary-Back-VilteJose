const { Schema, model, Types } = require("mongoose");

const schemaItinery = new Schema({
    name: {type: String, required: true},
    // userName: {type: String, required: true},
    // userPhoto: {type: String, required: true},
    price: {type: Number, required: true},
    duration: {type: String, required: true},
    comments: [{type: String, required: false}] ,
    _cities: {type: Types.ObjectId, ref: 'Cities'}
})

const Itineraries = model("Itineraries", schemaItinery)

module.exports = Itineraries;
const { Schema, model, Types } = require("mongoose");

const schemaItinery = new Schema({
    name: {type: String, required: true},
    img: {type:String},
    desc: {type:String},
    // userName: {type: String, required: true},
    // userPhoto: {type: String, required: true},
    price: {type: Number, required: true},
    duration: {type: String, required: true},
    comments: [{type: String, required: false}] ,
    likes: {type:Number},
    hastag:[{type: String}],
    _cities: {type: Types.ObjectId, ref: 'Cities'},
    _userCreator: {type: Types.ObjectId, ref: 'Users'}
})

const Itineraries = model("Itineraries", schemaItinery)

module.exports = Itineraries;
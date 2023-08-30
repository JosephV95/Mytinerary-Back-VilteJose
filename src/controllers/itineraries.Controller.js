const Itineraries = require('../models/Itineraries.js')
const Cities = require('../models/Cities.js')

const createItinerary = async (req, res, next) =>{
    try {
        let {id} = req.query

        let cityFound = await Cities.findById( id )
        
        let newItinerary = await Itineraries.create( req.body ) //Aqui solo devolvera un estado de si se creo o no, por eso no es conveniente guardarlo en una variable
        
        // Aqui se le agregara el itinerario a la city actulizando su informacion
        await cityFound.updateOne({ _itineraries: [...cityFound._itineraries, newItinerary]}) //! con el spread operator se ira agregando un nuevo itinerario en su array de itinerarios

        // Se debe volver a buscar la city con la nueva informacion agregada
        let cityUpdate = await Cities.findById(id).populate('_itineraries');

        return res.status(201).json({
            message: "It was created successfully",
            cityUpdate
        })
    } catch (error) {
        // console.log(error.message);
        next()
    }
}

const readItineraries = async (req, res) =>{
    try {
        let queries = {};
        if (req.query.name) {
            queries.name = new RegExp( "^" +  req.query.name, "i")
        }
        
        let itineraries = await Itineraries.find( queries)

        return res.status(200).json({
            itineraries
        })
    } catch (error) {
        res.status(500)
    }
}

const readItinerary = async (req, res) =>{
    try {
        let oneItinerary = await Itineraries.findById(req.params.id)

        return res.status(200).json({
            oneItinerary
        })
    } catch (error) {
        return res.status(500)
    }
}


const createMany = async(req, res, next) =>{
    try {
        
    } catch (error) {
        next()
    }
}

const updateItinerary = async (req, res, next) =>{
    try {
        
    } catch (error) {
        next()
    }
}

const deleteItinenary = async (req, res) =>{
    try {
        
    } catch (error) {
        return res.status(500)
    }
}

module.exports = {readItineraries, readItinerary, createItinerary, createMany, updateItinerary, deleteItinenary}
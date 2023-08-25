const Itineraries = require('../models/Itineraries.js')

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

const createItinerary = async (req, res, next) =>{
    try {
        let newItinerary = await Itineraries.create( req.body)
        return res.status(201).json({
            message: "It was created successfully",
            newItinerary
        })
    } catch (error) {
        next()
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
const Itineraries = require('../models/Itineraries.js')
const Cities = require('../models/Cities.js')

const createItinerary = async (req, res, next) =>{
    try {
        let {id} = req.query

        let cityFound = await Cities.findById( id )
        
        let newItinerary = await Itineraries.create( req.body ) //Aqui solo devolvera un estado de si se creo o no, por eso no es conveniente guardarlo en una variable
        
        // Aqui se le agregara el itinerario a la city actulizando su informacion
        await cityFound.updateOne({ _itineraries: [...cityFound._itineraries, newItinerary]}) //? con el spread operator se ira agregando un nuevo itinerario en su array de itinerarios

        // Se debe volver a buscar la city con la nueva informacion agregada
        let cityUpdate = await Cities.findById(id).populate('_itineraries');

        return res.status(201).json({
            message: "Itinerary created successfully",
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
        } else if (req.query.city) {
            queries.city = new RegExp( "^" +  req.query.city, "i")
        }
        
        let itineraries = await Itineraries.find(queries )
        
        //* Filtro de itinerarios segun la ciudad
        let itineraryForCity = await Cities.findOne(queries).populate('_itineraries')
        
        if (queries.city) {
            return res.status(200).json({
                city: itineraryForCity.city,
                nation: itineraryForCity.nation,
                itineraries: itineraryForCity._itineraries
            })
        } else {
            return res.status(200).json({
                itineraries
            })
        }
    } catch (error) {
        res.status(500)
    }
}
const getItinerariesByCity = async(req, res)=>{
    try {
        let itineraryCity = await Cities.findById(req.params.id).populate('_itineraries')
        return res.status(200).json({
            city: itineraryCity.city,
            itineraries: itineraryCity._itineraries
        })
    } catch (error) {
        return res.status(500)
    }
}

const readItinerary = async (req, res) =>{
    try {
        let oneItinerary = await Itineraries.findById(req.params.id)

    if (!oneItinerary) {
        return res.json({
            message: "Does not exist"
        })
    } else {
        return res.status(200).json({
            oneItinerary
        })
    }
       
    } catch (error) {
        return res.status(500)
    }
}

const updateItinerary = async (req, res, next) =>{
    try {
        let upItinerary = await Itineraries.findByIdAndUpdate(req.params.id , req.body,  {new:true});

        if (upItinerary) {
            return res.status(200).json({response: upItinerary})
        } else {
            return res.status(400).json({response: "Not Found"})
        }

    } catch (error) {
        next()
    }
}

const deleteItinenary = async (req, res) =>{
    try {
        let {id} = req.query

        if(await Itineraries.findById(id)){
            await Itineraries.findByIdAndDelete(id)
            return res.status(200).json({
                message: "Deleted successfully"
            })
        } else {
            return res.json({ message: "The id: " +id +" does not exist"})
        }

    } catch (error) {
        return res.status(500)
    }
}

module.exports = {readItineraries, readItinerary, createItinerary, updateItinerary, deleteItinenary,  getItinerariesByCity}
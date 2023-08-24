const Cities = require("../models/Cities.js")
const {insertMany} = require("mongoose")

// Ya que se conectaran con la base de datos, se deben crear funciones Asincronas
const readCities = async (req, res) => {
  try {
    let queries = {};
    if (req.query.city) {
      queries.city = new RegExp( "^"+ req.query.city, "i") // con el flag ¨i" se ignora mayusculas y minusculas y el ^ indica el comienzo exacto del query
    }
    let allCities = await Cities.find( queries)

    return res.status(200).json({
      mensaje: "All cities",
      allCities
    })
  } catch (error) {
    return req.status(500)
  }
};

const readCity = async (req, res) => {
 try {
  
  let oneCity = await Cities.findById(req.params.id)
  return res.status(200).json({
    oneCity
  })
 } catch (error) {
  return req.status(500)
 }
};

const createCity = async (req, res, next) => {
  try {
    let newCity = await Cities.create(req.body)
    return res.status(201).json({
      mensaje: "It was created correctly",
      newCity
    })
  } catch (error) {
      next()  
  }
};

const createMany = async (req, res, next)=>{
  try {
    await Cities.insertMany(req.body.dataCities)
    return res.status(201).json({
      message: "They were created successfully"
  })
  } catch (error) {
    next()
  }
}

const updateCity = async (req, res, next) =>{
  try {
    let upCity = await Cities.findByIdAndUpdate(req.params.id, req.body,  {new: true});

    if (upCity){
      return res.status(200).json({response: upCity})
    } else { return res.status(400).json({response: "Not Found"})}
    
  } catch (error) {
    next()
  }
};
// De forma alternativa se pasara el id por query para el Delete
const deleteCity = async (req, res) =>{
  try {
    let {id} = req.query;
    
    if (await Cities.findById(id)) {
      await Cities.findByIdAndDelete({_id:id})
      return res.status(200).json({
        mensaje : "Deleted successfully",
      })
    } else {
      return res.json({message: "The id: " + id + " does not exist"})
    }
  } catch (error) {
    return req.status(500)
  }
};

module.exports = { readCities, readCity, createCity, updateCity, deleteCity, createMany};

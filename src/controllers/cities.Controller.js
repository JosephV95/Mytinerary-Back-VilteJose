const Cities = require("../models/Cities.js")
const {insertMany} = require("mongoose")

// Ya que se conectaran con la base de datos, se deben crear funciones Asincronas
const readCities = async (req, res) => {
  try {
    let allCities = await Cities.find()
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
      mensaje: "se creo correctamente",
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
      message: "Se crearon Correctamente"
  })
  } catch (error) {
    next()
  }
}

const updateCity = async (req, res, next) =>{
  try {
    let upCity = await Cities.updateOne(req.body)
    await Cities.findByIdAndUpdate(req.params.id, upCity)
    return res.status(200).json({
      mensaje : "se actualizo correctamente",
  })
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
        mensaje : "se borro correctamente",
      })
    } else {
      return res.json({message: "no existe el id:" + id})
    }
  } catch (error) {
    return req.status(500)
  }
};

module.exports = { readCities, readCity, createCity, updateCity, deleteCity, createMany};

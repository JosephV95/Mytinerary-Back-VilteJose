const Cities = require("../models/Cities.js")
const readCities = (req, res) => {
  res.json({
    cities: [
      {
        nation: "Japan",
        city: "Akiha",
      },
      {
        nation: "Japan",
        city: "Tokio",
      },
      {
        nation: "Japan",
        city: "Shibuya",
      },
    ],
  });
};

const readCity = (req, res) => {
  res.json({
    nation: "Argentina",
    city: "Mendoza",
  });
};

const createCity = async (req, res) => {
  try {

    let payload = await Cities.create(req.body)
    return res.status(201).json({
      mensaje: " se creo correctamente XD",
      payload
    })
    // res.status(201).json({
    //   mensaje: " se creo correctamente XD",
    //   payload
    // })
  } catch (error) {()=>{
    res.status(500).json({
      Response: "error"
    })
  }}
};

module.exports = { readCities, readCity, createCity };

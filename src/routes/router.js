const express = require("express");
const {readCities, readCity, createCity, updateCity, deleteCity} = require('../controllers/cities.Controller')

const router = express.Router();

router.get("/cities", readCities);
router.get("/cities/:id", readCity);
router.post("/cities", createCity);
router.put("/cities/:id", updateCity);
router.delete("/cities", deleteCity);


module.exports = router
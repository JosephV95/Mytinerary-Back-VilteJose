const express = require("express");
const {readCities, readCity, createCity, updateCity, deleteCity} = require('../controllers/cities.Controller');
const verifyDataCity = require("../middlewares/verifyDataCity");

const router = express.Router();

router.get("/cities", readCities);
router.get("/cities/:id", readCity);
router.post("/cities",verifyDataCity,  createCity);
router.put("/cities/:id",verifyDataCity,  updateCity);
router.delete("/cities", deleteCity);


module.exports = router
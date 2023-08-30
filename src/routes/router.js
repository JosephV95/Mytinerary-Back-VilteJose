const express = require("express");
const {readCities, readCity, createCity, updateCity, deleteCity, createMany} = require('../controllers/cities.Controller');
const {verifyDataCity, verifyDataMany} = require("../middlewares/verifyDataCity");
const { createItinerary, readItineraries } = require("../controllers/itineraries.Controller");

const router = express.Router();

router.get("/cities", readCities);
router.get("/cities/:id", readCity);
router.post("/cities",verifyDataCity,  createCity);
router.post("/cities/many", verifyDataMany, createMany);
router.put("/cities/:id",verifyDataCity,  updateCity);
router.delete("/cities", deleteCity);

router.post("/itineraries", createItinerary);
router.get("/itineraries", readItineraries);

module.exports = router
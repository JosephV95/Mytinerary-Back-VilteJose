const express = require("express");
const {readCities, readCity, createCity} = require('../controllers/cities.Controller')

const router = express.Router();

router.get("/cities", readCities);
router.get("/city", readCity)
router.post("/cities", createCity)


module.exports = router
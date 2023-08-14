const express = require("express");
const {getCities, getCity, postCity} = require('../controllers/cities.Controller')

const router = express.Router();

router.get("/cities", getCities);
router.get("/city", getCity )


module.exports = router
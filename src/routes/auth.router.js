const express = require('express');
const { registerUser } = require('../controllers/auth.Controller');

const router = express.Router()

router.post('/register', registerUser )

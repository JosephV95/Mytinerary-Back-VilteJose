const express = require('express');
const { registerUser } = require('../controllers/auth.Controller');
const { verifyAuthData } = require('../middlewares/authVerifications');

const router = express.Router()

router.post('/register',verifyAuthData, registerUser )

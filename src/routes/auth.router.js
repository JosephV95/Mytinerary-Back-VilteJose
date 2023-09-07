const express = require('express');
const { registerUser } = require('../controllers/auth.Controller');
const { verifyAuthData } = require('../middlewares/authVerifications');

const routerAuth = express.Router()

routerAuth.post('/register',verifyAuthData, registerUser )


module.exports = routerAuth;
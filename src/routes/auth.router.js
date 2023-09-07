const express = require('express');
const { registerUser } = require('../controllers/auth.Controller');
const { verifyAuthData, hashPassword } = require('../middlewares/authVerifications');

const routerAuth = express.Router()

routerAuth.post('/register',verifyAuthData, hashPassword, registerUser )


module.exports = routerAuth;
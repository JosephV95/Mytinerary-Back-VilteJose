const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.Controller');
const { verifyAuthData, hashPassword } = require('../middlewares/authVerifications');

const routerAuth = express.Router()

routerAuth.post('/register',verifyAuthData, hashPassword, registerUser ),
routerAuth.post('/login', loginUser)


module.exports = routerAuth;
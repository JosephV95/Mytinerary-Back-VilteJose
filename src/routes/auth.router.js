const express = require('express');
const { registerUser, loginUser } = require('../controllers/auth.Controller');
const { hashPassword, verifyUserExist, verifyPassword, generateToken } = require('../middlewares/authMiddlewar');
const { verifyAuthData } = require('../middlewares/authVerifyData');

const routerAuth = express.Router()

routerAuth.post('/register', verifyAuthData, hashPassword, registerUser ),
routerAuth.post('/login', verifyUserExist, verifyPassword, generateToken, loginUser)


module.exports = routerAuth;
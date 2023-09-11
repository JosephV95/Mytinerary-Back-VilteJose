const express = require('express');
const { registerUser, loginUser, userAuthenticated } = require('../controllers/auth.Controller');
const { hashPassword, verifyUserExist, verifyPassword, generateToken, passportVerificator } = require('../middlewares/authMiddlewar');
const { verifyAuthData } = require('../middlewares/authVerifyData');

const routerAuth = express.Router()

routerAuth.post('/register', verifyAuthData, hashPassword, registerUser ),
routerAuth.post('/login', verifyUserExist, verifyPassword, generateToken, loginUser),
                                //! con 'authenticate' se indicara que trabaje con jwt y que no use session de Express
routerAuth.post('/authenticated', passportVerificator.authenticate("jwt", {session: false}), generateToken, userAuthenticated)


module.exports = routerAuth;
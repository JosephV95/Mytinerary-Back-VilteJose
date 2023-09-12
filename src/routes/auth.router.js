const express = require('express');
const { registerUser, loginUser, userAuthenticated, userLogout } = require('../controllers/auth.Controller');
const { hashPassword, verifyUserExist, verifyPassword, generateToken, passportVerificator } = require('../middlewares/authMiddlewar');
const { verifyAuthData } = require('../middlewares/authVerifyData');

const routerAuth = express.Router()

routerAuth.post('/register', verifyAuthData, hashPassword, registerUser ),
routerAuth.post('/login', verifyUserExist, verifyPassword, generateToken, loginUser),
                                //! con 'authenticate' se indicara que trabaje con jwt y que no use session de Express
routerAuth.post('/authenticated', passportVerificator.authenticate("jwt", {session: false}), generateToken, userAuthenticated),
                        //! Verificara si esta logeado para poder Desloguarse
routerAuth.post('/logout', passportVerificator.authenticate("jwt", {session: false}), userLogout) 


module.exports = routerAuth;
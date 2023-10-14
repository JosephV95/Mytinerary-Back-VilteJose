const express = require('express');
const { registerUser, loginUser, userAuthenticated, userLogout, readUsers, readUser, updateUser, deleteUser } = require('../controllers/auth.Controller');
const { hashPassword, verifyUserExist, verifyPassword, generateToken, passportVerificator } = require('../middlewares/authMiddlewar');
const { verifyAuthData } = require('../middlewares/authVerifyData');

const routerAuth = express.Router()

routerAuth.post('/register', verifyAuthData, hashPassword, generateToken, registerUser ),
routerAuth.post('/login', verifyUserExist, verifyPassword, generateToken, loginUser),
                                //! con 'authenticate' se indicara que trabaje con jwt y que no use session de Express
routerAuth.post('/authenticate', passportVerificator.authenticate("jwt", {session: false}), generateToken, userAuthenticated), 
                        //! Verificara si esta logeado para poder Desloguarse
routerAuth.post('/logout',  userLogout), //? quite la verificación del usuario porque no permitia la respuesta del logout y daba un error en el navegador

routerAuth.get('/', readUsers),
routerAuth.get('/:id', readUser),
routerAuth.put('/:id', updateUser),
routerAuth.delete('/:id', deleteUser)



module.exports = routerAuth;
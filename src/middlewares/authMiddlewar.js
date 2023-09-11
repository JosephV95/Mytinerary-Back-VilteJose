const bcrypt = require('bcrypt');
const Users = require("../models/Users")
const jwt = require('jsonwebtoken')

const passport = require('passport');
const {Strategy, ExtractJwt} = require('passport-jwt')

//! Hashear el password de user
const hashPassword = (req, res, next) => {
    try {
        const passwordBase = req.body.password
        const passwordHashed = bcrypt.hashSync( passwordBase, 10) //! el saltRounds por defecto es 10, a mayor numero mas tardara en hacer el hash

        req.body.password = passwordHashed //* Se setea el password con la pass hasheada

        next()

    } catch (error) {
        res.status(500).json({error: error})
    }
}

//! Verificar la existencia o no de un user
const verifyUserExist = async(req, res, next)=>{
    const { email } = req.body;

        const userFound = await Users.findOne({email: email})

        if(userFound){
            req.user = userFound;  //todo Se puede guardar al Usuario en la petición creando el query "user", y asi evitar volver hacer la peticion más adelante
            
            next();  //* en caso de encontrar al usuario(por email) se pasara al siguiente middleware (donde se compara las pass)

        } else{
            res.status(400).json({message: "User not found"});
        }
}
//! se comparara las password para verificar al user
const verifyPassword = (req, res, next)=>{
    const passBase = req.body.password;
    const passHashed = req.user.password;

    const verify = bcrypt.compareSync( passBase, passHashed); //? Retornara un boolean

    if(verify){
        next();
    } else {
        res.status(400).json({ message: "Wrong password"})
    }
}
//! crear el Token para el user
const generateToken = (req, res, next)=>{
    try {
        let secretKey = "claveSecretaPrivada"; //* el token necesita una clave secreta, luego lo pasamos como 2do parametro 
        
        //* sign es para firmar/iniciar el token -- el 1er paramatro sera el contenido del payload/cuerpo del token
        let token = jwt.sign({email: req.body.email}, secretKey, {expiresIn: 60*5}) //*el 3er parametro seria el tiempo de vida del token, es opcional(aqui seria 5min)

        req.token = token //todo se guarda el token en la request para usarlo luego
        next()
        
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

//* Autenticacion de un User Logeado segun un token guardado -- Todo retornara un objeto que se debe manejar en el router
const passportVerificator = passport.use(
    //todo  Strategy ya es un modelo de passport-jwt que desencriptara el token 
    new Strategy({
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: "claveSecretaPrivada"
    }, async( payload , done)=> {  
        //* payload tendra la data del token que se desencripto. Y done es similar a next() pero permite setear algunos valores
        try {
            let userFound = await Users.findOne( {email: payload.email} )

            if (userFound) {
                return done(null, userFound); //? el 2do parametro es lo que mandara en req.user
            } else {
                return done(null);
            }
        } catch (error) {
            return done(error)
        }
    })
)

module.exports = { hashPassword, verifyUserExist, verifyPassword, generateToken, passportVerificator }
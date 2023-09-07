const Joi = require('joi');
const bcrypt = require('bcrypt');

const userSchema = Joi.object({
    name: Joi.string().required() ,
    lastname: Joi.string(),
    email: Joi.string().email().required().messages({
        'string.email': "Ingresar un email valido",
        'string.empty': "Ingresa tu email",  //  en caso de string vacio
        'any.required': "Se debe ingresar un email"  // caso de que se envie el campo vacio
    }),
    password: Joi.string().alphanum().min(6).max(12).required().messages({
        'string.min': "Ingresar como minimo 6 cifras",
        'string.max': "Ingresar como maximo 12 cifras"
    }),
    photo: Joi.string().uri(),
    nation: Joi.string()
})

const verifyAuthData = (req, res, next)=>{
    let payload = req.body;
    
    const userValidated = userSchema.validate(payload)

    // if que se mostrara en caso de errores
    if(userValidated.error){
        return res.status(400).json({
            message: userValidated.error.details.map( err => err.message )  //! el details mostrara un array con todos los errores
        }) 
    }

    next()
}

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

module.exports = {verifyAuthData,  hashPassword}
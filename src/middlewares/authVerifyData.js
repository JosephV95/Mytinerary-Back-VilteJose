const Joi = require('joi');

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
    
    const userValidated = userSchema.validate(payload, {abortEarly: false}); //! con abortEarly se impide que solo devuelva el primer error y devuelva el array con todos los errores

    // if que se mostrara en caso de errores
    if(userValidated.error){
        return res.status(400).json({
            message: userValidated.error.details.map( err => err.message )  //! el details mostrara un array con todos los errores
        }) 
    }

    next()
}

module.exports = {verifyAuthData}
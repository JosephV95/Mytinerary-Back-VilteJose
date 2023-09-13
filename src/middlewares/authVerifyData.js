const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required() ,
    lastname: Joi.string().required(),
    email: Joi.string().email().required().messages({
        'string.email': "Enter a valid email",
        'string.empty': "Ingresa tu email",  //  en caso de string vacio
        'any.required': "Se debe ingresar un email"  // caso de que se envie el campo vacio
    }),
    password: Joi.string().alphanum().min(6).max(12).required().messages({
        'string.min': "Enter at least 6 figures",
        'string.max': "Enter a maximum of 12 digits",
        'string.alphanum': "The password must not contain symbols"
    }),
    photo: Joi.string().uri().required(),
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
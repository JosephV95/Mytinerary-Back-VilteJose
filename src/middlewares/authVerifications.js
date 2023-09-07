const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required() ,
    lastname: Joi.string().required(),
    email: Joi.email().required(),
    password: Joi.password(),
    photo: Joi.string().uri(),
    nation: Joi.string()
})
const verifyAuthData = (req, res, next)=>{

}

module.exports = {verifyAuthData}
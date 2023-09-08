const bcrypt = require('bcrypt');
const Users = require("../models/Users")

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
            req.user = userFound;  //todo Se crea el query "user" que contendra al usuario encontrado y asi evitar volver hacer la peticion más adelante
            
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

module.exports = { hashPassword, verifyUserExist, verifyPassword }
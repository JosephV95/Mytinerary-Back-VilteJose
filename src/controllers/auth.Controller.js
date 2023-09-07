const { verifyPassword } = require("../middlewares/authVerifications")
const Users = require("../models/Users")

const registerUser = async(req, res) =>{
    try {
        let payload = req.body
        let userExists = await Users.findOne( {email: payload.email}) //! Verifica si ese email ya posee una cuenta

        if(userExists){
            return res.status(403).json({message: "User already exists"})  //* status 403 forbiden (indica que esta prohibido)
        }

        const userCreated = await Users.create(payload)

        return res.status(200).json({
            message: "User created correctly", userCreated
        })
    } catch (error) {
        res.status(200).json({ message: error.message})        
    }
}

const loginUser = async(req, res)=>{
    try {
        const {password, email} = req.body;

        const userFound = await Users.findOne({email: email})

        if(userFound){
            //* Si encuentra al usuario (por email) pasara a comparar las contraseñas
            if(verifyPassword(password, userFound.password)){
                return res.status(200).json({
                    message: "user logeado correctamente",
                    userFound
                })
            } else {
                return res.status(400).json({message: "Wrong password"});  
            }
        } else{
            res.status(400).json({message: "User not found"});
        }
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

module.exports = { registerUser, loginUser }
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

module.exports = { registerUser }
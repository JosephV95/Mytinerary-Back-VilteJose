const Users = require("../models/Users")

const registerUser = async(req, res) =>{
    try {
        let payload = req.body
        let userExists = await Users.findOne( {email: payload.email}) //! Verifica si ese email ya posee una cuenta

        if(userExists){
            return res.status(403).json({message: "The email "+ payload.email +" already has an account"})  //* status 403 forbiden (indica que esta prohibido)
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
        //! despues de pasar los middlewares retornara el token y toda la info del user que necesite
        res.status(200).json({
            message: "Se logueo correctamente",
            token: req.token,
            success: true,
            user: {
                name: req.user.name,
                email: req.user.email,
                photo: req.user.photo,
                _id: req.user._id
            }
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const userAuthenticated = async(req, res)=>{
    try {
        //! despues de pasar los middlewares retornara el token y toda la info del user que necesite
        res.status(200).json({
            message: "Se autentico el usuario correctamente",
            token: req.token,
            user: {
                name: req.user.name,
                email: req.user.email,
                photo: req.user.photo,
                _id: req.user._id
            }
        })
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

const userLogout = async (req, res) =>{
    try {
        res.status(200).json({ mesage: "User Logout correctly" })
    } catch (error) {
        res.status(500).json({ message: error.message})
    }
}

module.exports = { registerUser, loginUser, userAuthenticated, userLogout }
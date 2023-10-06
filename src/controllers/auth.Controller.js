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
            message: "User created correctly",
            success: true,
            token: req.token,
            userCreated
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
            user: req.user
            
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
            user: req.user
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

// todo   Endpoints extras para el CRUD de usuarios
const readUsers = async(req, res) =>{
    try {
        const allUsers = await Users.find()

        return res.status(200).json({
            allUsers
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al traer los users"})
    }
}
const readUser = async (req,res)=>{
    try {
        const oneUser = await Users.findById(req.params.id)
        return res.status(200).json({
            oneUser
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al traer al user"})
    }
}
const updateUser = async(req,res) =>{
    try {
        let upUser =await Users.findByIdAndUpdate( req.params.id, req.body, {new:true})

        if (upUser) {
            return res.status(200).json({
                upUser
            })
        } else {
            return res.status(400).json({message: "El usuario no existe"})
        }
    } catch (error) {
        res.status(500).json({ message: "Error al actualizat al user"})
    }
}
const deleteUser = async(req,res) =>{
    try {
        let {id} = req.params
        if (await Users.findById(id)) {
            await Users.findByIdAndDelete(id)
            return res.status(200).json({
                message: "Se borro al usuario correctamente",
                id: id
            })
        } else {
            return res.status(500).json({
                message: "El id: " + id +" no existe"
            })
        }
        
    } catch (error) {
        res.status(500).json({message: "El id no se puede borrar porque no existe"})
    }
}
module.exports = { registerUser, loginUser, userAuthenticated, userLogout,  readUser,readUsers,updateUser,deleteUser }
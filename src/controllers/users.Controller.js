const Users = require("../models/Users")

const createUser = async(req, res) =>{
    try {
        let userCreate = await Users.create()
    } catch (error) {
        
    }
}
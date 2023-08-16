
const verifyDataCity = (req, res, next) =>{
    let {nation, city, img} = req.body

    if(!nation || !city || !img){
        return res.status(400).json({ message: "Invalid data"})
    }
    if(nation == ""){
        return res.status(400).json({ message: "Invalid data"})
    }
    if(city == ""){
        return res.status(400).json({ message: "Invalid data"})
    }
    if(img == ""){
        return res.status(400).json({ message: "Invalid data"})
    }

    next()
}

module.exports = verifyDataCity;
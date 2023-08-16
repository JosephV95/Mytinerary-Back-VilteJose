// const createError = require('http-errors')

// Manejara errores de las rutas invalidas
const notFound = (req, res, next)=>{
    return res.status(400).json({
        status: 404,
        message: "Not Page Found"
    })
}

module.exports = notFound;
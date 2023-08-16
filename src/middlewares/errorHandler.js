// Manejara errores del servidor
const errorHandeler = (err, req, res, next)=>{
    console.log(err);
    res.status(err.status || 500).json({
        status: err.status,
        message: err.message
    })

}

module.exports = errorHandeler
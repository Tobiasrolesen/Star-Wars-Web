//notFound behøver ikke next da den altid sender et svar
function notFound(req, res){
    res.status(404).json({ error: `Route ${req.method} ${req.originalUrl} not found` });
}

//Ved 4 parameter ved express at det er en errorhandler. Hvis en route eller middleware kaster en fejl kaldes denne.
function errorHandler(err, req, res, next){
    //En fejl per svar
    if (res.headersSent){
        return next(err)
    }
    if (err.type === "entity.parse.failed"){
        return res.status(400).json({error: "Invalid JSON"})
    }
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
}

module.exports = {notFound, errorHandler}
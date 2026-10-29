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
    if (err.status >= 400 && err.status < 500) {
        //Expose bruges til at fortælle om beskeden er sikker at vise. Fx ville en sti til en download ikke være god at vise.
        const message = err.expose ? err.message : "Request could not be completed";
        return res.status(err.status).json({ error: message });
    }
    console.error(err);
    res.status(500).json({error: "Internal Server Error"});
}

module.exports = {notFound, errorHandler}
//Sikre at ID er af et tal.
function validateId(req, res, next){
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({error: "Id must be a positive whole number"})
    }
    //Vi hænger hvis vi ikke tilføjer next
    next();
}

module.exports = validateId;
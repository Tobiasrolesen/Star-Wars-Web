//Validering af character
const { ROLES } = require("../models/Character");
function validateCharacter(req, res, next) {
    const { name, role, planet } = req.body || {};
    if (typeof name !== "string") {
        return res.status(400).json({ error: "Name must be text" });
    }
    if (name.trim().length < 2) {
        return res.status(400).json({ error: "Name must be at least 2 characters" });
    }
    if (!ROLES.includes(role)) {
        return res.status(400).json({ error: "Role must be Jedi, Sith, Rebel or Smuggler" });
    }
    if (typeof planet !== "string" || planet.trim() === "") {
        return res.status(400).json({ error: "Planet must be non-empty text" });
    }
    next();
}
module.exports = validateCharacter;
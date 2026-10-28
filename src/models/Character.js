//Opbygger en domaine model en opskrift.
const ROLES = ["Jedi", "Sith", "Rebel", "Smuggler"];
function buildCharacter(id, data){
    return {
        id: id,
        name: data.name.trim(),
        role: data.role,
        planet: data.planet.trim()
    };
}
module.exports = {ROLES, buildCharacter};
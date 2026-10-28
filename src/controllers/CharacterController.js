const characterService = require('../services/CharacterService');
function getAllCharacters(req, res){
    const characters = characterService.getAllCharacters();
    res.status(200).json(characters);
}
function getCharacterById(req, res){
    const id = Number(req.params.id);
    //Kald igennem arkitekturen.
    const character = characterService.getCharacterById(id);
    //Sikring af character eksistere.
    if (!character){
        return res.status(404).json({error: "Character not found"})
    }
    res.status(200).json(character);
}

function createCharacter(req, res){
    //Kald igennem lagende
    const newCharacter = characterService.addCharacter(req.body);
    //statuskode 201 betyder created, mere præsist end bare 200 som er OK
    res.status(201).json(newCharacter);
}

module.exports = {getAllCharacters,getCharacterById,createCharacter};
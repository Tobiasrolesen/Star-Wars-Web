const fs = require('fs');
const path = require('path');
const { buildCharacter } = require("../models/Character");
const DATA_FILE = path.join(__dirname, "..", "data", "characters.json");

//Metode til at læse characters og retunere et array
function loadCharacters(){
    try {
        //Hele filen læses
        const content = fs.readFileSync(DATA_FILE, "utf-8");
        //Parser json tekst om til et JS object.
        const data = JSON.parse(content);

        //Håndtere om det gyldige json faktisk er et array eller ikke.
        if (!Array.isArray(data)) {
            console.error("No Array found, starting a empty list");
            return [];
        }
        return data;
    } catch (err) {
        //Fejl håndtere på om filen faktisk findes.
        if (err.code === "ENOENT") {
            console.warn("characters.json could not be found.");
        } else {
            console.error("Could not read characters.json", err.message);
        }
        //Retuner en tom liste hvis fuld fejl.
        return [];
    }
}

//Gemmer alle characters efter hver CRUD operation
function saveCharacters(){
    //Objekt laves om til json tekst igen pænt.
    fs.writeFileSync(DATA_FILE, JSON.stringify(characters, null, 2));
}

//Finder næste id som er unikt
function getNextId(){
    if (characters.length === 0){
        return 1;
    }
    //Opretter et array med ider 1,2,3,4
    const ids = characters.map((character) => character.id);
    //...ids pakker array ud så Math.max forstår det og giver det næste ledige id.
    return Math.max(...ids) + 1;
}

//Retunere arrayed
function getAllCharacters(){
    return characters;
}

//Gennemgår arrayed og retunere det første element hvor betingelsen er true.
function getCharacterById(id){
    return characters.find((character) => character.id === id);
}

//Tilføj character
function addCharacter(data){
    //Byg objekt på modellen
    const newCharacter = buildCharacter(getNextId(), data);
    //Vi .push til arrayed
    characters.push(newCharacter);
    //Gemmer direkte til filen
    saveCharacters();
    //Retunere objektet med id (OOP regler)
    return newCharacter;
}

//Opdatering af character
function replaceCharacter(id, data){
    //Find positioned i arrayed i stedet for selve objektets da vi skal erstatte noget.
    const index = characters.findIndex((character) => character.id === id);
    //Vi retunere null da controlleren selv oversætter null til 404 samme situation som getCharacterById
    if (index === -1){
        return null;
    }

    //Vi bruger modellen igen, id kommer fra url og ikke bodyen så man ikke kan manipulere data.
    const updatedCharacter = buildCharacter(id, data);
    characters[index] = updatedCharacter;

    //Vi gemmer characterene.
    saveCharacters();
    return updatedCharacter;
}

function deleteCharacter(id){
    //Samme som replaceCharacter
    const index = characters.findIndex((character) => character.id === id);
    if (index === -1){
        return null;
    }
    //splice fjerne elementet fra arrayed direkte
    characters.splice(index, 1);
    saveCharacters();
    //True eller false da controlleren bare skal vide om det lykkes eller ej.
    return true;
}

//Midlertidig database i hukommelsen // brugt til at teste node -e "require('./src/services/CharacterService')"
let characters = loadCharacters();
console.log(`Indlæst ${characters.length} characters`);
module.exports = { getAllCharacters, getCharacterById, addCharacter, replaceCharacter, deleteCharacter };

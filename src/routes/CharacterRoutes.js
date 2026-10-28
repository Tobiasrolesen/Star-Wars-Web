const express = require("express");
const characterController = require("../controllers/CharacterController");
const validateId = require("../middleware/ValidateId");
const validateCharacter = require("../middleware/ValidateCharacter");
const router = express.Router();

//Router sidder på character og derfor betyder / faktisk /characters
router.get("/", characterController.getAllCharacters);

//Express kalder validateId før controller klassen, dermed middleware først.
//Man skal heller ikke kalde metoden i express med (), uden () kan vi kalde metoden senere når en request opstår.
router.get("/:id", validateId, characterController.getCharacterById);

//Metoden bestemmer handlingen
//Har samme route som router.get"/"
router.post("/", validateCharacter, characterController.createCharacter);

//Tjek id før character. Afvis før serveren behøver arbejde på character
router.put("/:id", validateId, validateCharacter, characterController.replaceCharacter);

//Mini App.
module.exports = router;
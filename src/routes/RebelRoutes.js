//Dette modul bruges til at downloade fil og redirect.
const express = require("express");
const path = require("path");
const router = express.Router();
const REBEL_FILE = path.join(__dirname, "..", "files", "rebel-alliance.txt");
router.get("/download", (req, res) => {
    res.download(REBEL_FILE, "rebel-alliance.txt");
});
//Sender Statuskode 302 og browseren læser Location og laver en ny get request.
router.get("/go-to-luke", (req, res) => {
    res.redirect("/characters/1");
});
module.exports = router;
const express = require("express");
const logger = require("./middleware/Logger");
const characterRoutes = require("./routes/CharacterRoutes");
const app = express();

//registrering af alt middleware
app.use(express.json());

//Bruger logger i stedet for inline i server
app.use(logger);

//Fortæller hvor vi montere routeren
app.use("/characters", characterRoutes);
module.exports = app;
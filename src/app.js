const express = require("express");
const logger = require("./middleware/Logger");
const { notFound, errorHandler } = require("./middleware/ErrorHandlers");
const characterRoutes = require("./routes/CharacterRoutes");
const app = express();

//registrering af alt middleware
app.use(express.json());

//Bruger logger i stedet for inline i server
app.use(logger);

//Fortæller hvor vi montere routeren
app.use("/characters", characterRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
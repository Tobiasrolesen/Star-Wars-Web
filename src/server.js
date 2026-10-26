const express = require("express");
const app = express();

app.use(express.json());

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.get("/", (req, res) => {
    res.send("Velkommen til min server!");
});

app.listen(3000, () => {
    console.log("Server is running at: http://localhost:3000");
});

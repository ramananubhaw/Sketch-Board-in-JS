const express = require("express");
const path = require("path");
const app = express();

require("dotenv").config();

const port = process.env.PORT || 3000;

const mainDir = path.join(__dirname,"..");
const frontendDir = path.join(mainDir,"frontend")
app.use(express.static(frontendDir));

app.get("/", (req,res) => {
    res.sendFile(path.join(frontendDir,"creator.html"));
})

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
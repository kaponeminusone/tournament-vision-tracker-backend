const express = require("express");
const config = require("./config");
const cors = require("cors");

const app = express();
const PORT = config.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/", (req, res) => {
    res.status(200).send("<h1> Hello World! </h1>")
})

app.listen(PORT,() => {
    console.log(`Listening on port ${PORT}`);
})
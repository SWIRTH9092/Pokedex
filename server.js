require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require("morgan")  // import Morgan (logging middleware)
const PORT = process.env.POR || 3000; // (in case of env file missing)


app.listen(3000, ()=> {
    console.log("listening on port:", PORT)
})
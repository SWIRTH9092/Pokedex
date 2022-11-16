//get express package
const { response } = require('express');
const express = require('express')

//get MethodOverride Package
const methodOverride = require("method-override") // import method override

router.use("/static", express.static("public")) // it's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css

//Update the location of the data
const pokemon = require('../models/pokemon')

// for ejs-helpers 
const helpers = require("./ejs-helpers.js")

//instead of app=express
const router = express.Router();

//note router.get
router.get('/', (req, res) => {
    console.log("In get router")
    res.send(`<h1>Get worked from Index File </h1>`)
})

//make this router exportable
module.exports = router;
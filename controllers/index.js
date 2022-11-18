//get express package
const { response, application } = require('express');
const express = require('express')

//get MethodOverride Package
const methodOverride = require("method-override") // import method override

//instead of app=express
const router = express.Router();

router.use("/static", express.static("public")) // it's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css

//Update the location of the data
const pokemon = require('../models/pokemon')

// for ejs-helpers 
const helpers = require("./ejs-helpers.js")

// set the default template extension


// HOME ROUTE - Just redirects you to budgets index for now
router.get("/", (req, res) => res.redirect("/Pokedex"))

// INDEX ROUTE - GET to / - Returns all Budget Items
router.get('/Pokedex', (req,res) => {
    // res.render(template, data)
    res.render(
        'index',
        {
            allpokemon:pokemon
        }
    );
});
//make this router exportable
module.exports = router;
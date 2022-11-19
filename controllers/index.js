//get express package
const { response, application } = require('express');
const express = require('express')

//get MethodOverride Package
const methodOverride = require("method-override") // import method override

//Update the location of the data
const pokemon = require('../models/pokemon')

// for ejs-helpers 
const helpers = require("./ejs-helpers.js")

//instead of app=express
const router = express.Router();
router.use("/Pokedex", express.urlencoded({extended: true})) 

//Method over-ride
router.use(methodOverride("_method")) // swap the method if the url has a ?_method=XXX query

router.use("/static", express.static("public")) // it's going serve files from a folder called "public" under /static example public/styles.css => /static/styles.css

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

// DESTROY Route - DELETE to /Pokedex/:index - deletes the specified
router.delete("/Pokedex/:index", (req, res) => {
    //splice the item out of the array
    pokemon.splice(req.params.index, 1)
    // redirect user back to index
    res.redirect("/Pokedex")  
  })

// EDIT route = GET to /Pokedex/:index/edit - render a form to edit the Pokemon Info
router.get("/Pokedex/:index/edit", (req, res) => {
  // render edit.ejs with the existing Pokemon data
  console.log("pokemonInfo - edit:", pokemon[req.params.index] )
  res.render("edit.ejs", {
    pokemonInfo: pokemon[req.params.index],
    index: req.params.index,  
    helpers 
  })
})

router.put("/Pokedex/:index", (req, res) => {
  console.log(req.header)
  console.log("req.body", req.body)
  // console.log("req.body.type",req.body.type)
  // convert amount from string to number
  // let workAmount = 0;
  // if (!req.body.amount) {
  //    workAmount = 0
  // }  else{
  //    workAmount = parseInt(req.body.amount)
  // }
 
  // req.body.amount = workAmount
 
  // convert type to an array and them remove leading and trailing spaces
  let workType = [];
  workType = req.body.type.split(",")
  
  workType = workType.map (function (el){return el.trim();});
  req.body.type = workType

  console.log("req.body", req.body)
  console.log("req.body.type",req.body.type)

  // updating Pokemon - for fields on edit form
    pokemon[req.params.index].name = req.body.name
    pokemon[req.params.index].img = req.body.img
    pokemon[req.params.index].type = req.body.type
     
 
  // redirect user back to index
      res.redirect("/Pokedex")
})

  //SHOW ROUTE - GET to /Pokedex - Returns a info for a pokemon
router.get("/Pokedex/:index", (req, res) => {
    // res.render(template, data)
    res.render("show.ejs", {
      pokemonInfo: pokemon[req.params.index],
      index: req.params.index,  
      helpers  
    });
  });
//make this router exportable
module.exports = router;
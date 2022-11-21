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
  console.log("req.parms.index", req.params.index)  
  //splice the item out of the array
    pokemon.splice(req.params.index, 1)
    // redirect user back to index
    res.redirect("/Pokedex")  
  })

// EDIT route = GET to /Pokedex/:index/edit - render a form to edit the Pokemon Info
router.get("/Pokedex/:index/edit", (req, res) => {
  // render edit.ejs with the existing Pokemon data
  console.log("pokemon - edit",req.body.damages)
  res.render("edit.ejs", {
    pokemonInfo: pokemon[req.params.index],
    index: req.params.index,  
    helpers 
  })
})
// New Route - Get to /Pokedex/new - render a page with a form to create a new thing
router.get('/Pokedex/new', (req, res)=> {
    res.render("new.ejs")
})

//new route - post to /Pokedex- receive data from the data from the form and create a new fruit then redirect the user back to index

router.post("/Pokedex", (req, res)=> {

    let workType = [];
    workType = req.body.type.split(",")
    workType = workType.map (function (el){return el.trim();});
    req.body.type = workType
    req.body= {
        ...req.body,
        stats: {
          hp: req.body.stats[0],
          attack: req.body.stats[1],
          defense: req.body.stats[2],
          spattack:req.body.stats[3],
          spdefense: req.body.stats[4],
          speed: req.body.stats[5]
        },
        damages: {
          normal: req.body.damages[0],
          fire: req.body.damages[1],   
          wate: req.body.damages[2],
          electric: req.body.damages[3],
          grass: req.body.damages[4],
          ice: req.body.damages[5],
          fight: req.body.damages[6],
          poison: req.body.damages[7],
          ground: req.body.damages[8],
          flying: req.body.damages[9],
          psychic: req.body.damages[10],
          bug: req.body.damages[11],
          rock: req.body.damages[12],
          ghost: req.body.damages[13],
          dragon: req.body.damages[14],
          dark: req.body.damages[15],
          steel: req.body.damages[16]  
        }
    }
    pokemon.push(req.body)
    // redirect back to idnex page
    res.redirect("/Pokedex")

    //  res.json(req.headers, req.body, req,method)

})
router.put("/Pokedex/:index", (req, res) => {

  // convert type to an array and them remove leading and trailing spaces
 

  //Update stats
  let workStats = pokemon[req.params.index].stats;
  workStats.hp = req.body.stats[0];
  workStats.attack = req.body.stats[1];
  workStats.defense = req.body.stats[2];
  workStats.spattack = req.body.stats[3];
  workStats.spdefense = req.body.stats[4];
  workStats.speed = req.body.stats[5];
  
  //updating Damages
  let workDamages = pokemon[req.params.index].damages;
  workDamages.normal = req.body.damages[0];
  workDamages.fire = req.body.damages[1];    
  workDamages.water = req.body.damages[2];
  workDamages.electric = req.body.damages[3];
  workDamages.grass = req.body.damages[4];
  workDamages.ice = req.body.damages[5];
  workDamages.fight = req.body.damages[6];
  workDamages.poison = req.body.damages[7];
  workDamages.ground = req.body.damages[8];
  workDamages.flying = req.body.damages[9];
  workDamages.psychic = req.body.damages[10];
  workDamages.bug = req.body.damages[11];
  workDamages.rock = req.body.damages[12];
  workDamages.ghost = req.body.damages[13];
  workDamages.dragon = req.body.damages[14];
  workDamages.dark = req.body.damages[15];
  workDamages.steel = req.body.damages[16];   
     
  // updating Pokemon - for fields on edit form
  pokemon[req.params.index].name = req.body.name;
  pokemon[req.params.index].img = req.body.img;
  pokemon[req.params.index].type = req.body.type;
  pokemon[req.params.index].stats = workStats;
  pokemon[req.params.index].damages = workDamages;
   
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
//get express package
const { response } = require('express');
const express = require('express')

//Update the location of the data
const pokemon = require('../models/pokemon')

//instead of app=express
const router = express.Router();

//note router.get
router.get('/', (req, res) => {
    console.log("In get router")
    res.send(`<h1>Get worked from Index File </h1>`)
})


//make this router exportable
module.exports = router;
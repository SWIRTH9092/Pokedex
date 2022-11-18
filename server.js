require("dotenv").config();
const express = require('express');
const app = express();
const morgan = require("morgan")  // import Morgan (logging middleware)
const PORT = process.env.POR || 3000; // (in case of env file missing)

// point to controller file
const pokemon = require('./controllers/index');

// set the default template extension
app.set("view engine", "ejs")

//changes the views folder
// app.set("views", process.cwd() + "/views2")

//for non express template engine could the following to connect it
//app.engine("ejs", require("ejs").__express)

//use the pokemon controller
app.use(pokemon);

app.listen(3000, ()=> {
    console.log("listening on port:", PORT)
})
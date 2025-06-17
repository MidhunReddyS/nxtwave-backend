const express = require("express");
const Router = express.Router();


//Router imports
const Users = require("./Users");


// Routes
Router.use("/users", Users);

module.exports = Router;




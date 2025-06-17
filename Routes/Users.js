const express = require("express");
const Router = express.Router();

// MiddleWare imports
const token_verify = require('../Middleware/VerifyToken');
const upload = require('../Middleware/Multer');

// Controller imports
const Users = require("../Controllers/Users");

//Routes
Router.post("/login", Users.login);
Router.post("/signup", upload.single('profile_pic'), Users.signup);
Router.post("/verify", Users.verifyOtp);
Router.get("/getById", token_verify, Users.getUserById);
Router.delete("/delete", token_verify, Users.deleteById);


module.exports = Router;

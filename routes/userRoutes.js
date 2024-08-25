const UserController = require('../controllers/userControllers')
const express=require('express');
const router=express.Router();
router.post("/",UserController.createUser)
router.post("/login",UserController.login)
module.exports=router
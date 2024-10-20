const express = require("express");
const User = require("../models/user");
const router = express.Router();
const {v4: uuidV4} = require('uuid')
const {setUser}= require('../service/auth')

router.post('/' , async (req ,res)=>{
     const {name , email , password} = req.body;
     await User.create({
        name,
        email,
        password
     })
     res.redirect("/")
})

router.post('/login' , async (req ,res)=>{
    const { email , password} = req.body;
    const user = await User.findOne({
       email,
       password
    })
    if(!user){
        res.render('login', {error: "invalid user name or password"})
    }
    const token = setUser(user);
    
    res.cookie('uid' , token);

    res.redirect("/")
})



module.exports = router;
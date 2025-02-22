const express = require('express');
const routes = express();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');


routes.get('/register',(req,res)=>
    {
        res.render('register');
    })
    
routes.post('/register',
    body('name').trim().isLength({min:3}),
    body('email').trim().isEmail(),
    body('password').trim().isLength({min:8}),
    async (req,res)=> {

    const error=validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({errors:error.array(),message:'Validation Error'});
    }
    
    const {name,email,password}=req.body;

    const hashpassword =await bcrypt.hash(password,10);

     const user = await userModel.create({
      email:email,
      name:name,
      password:hashpassword,
    })

    res.json(user);

})

module.exports=routes;
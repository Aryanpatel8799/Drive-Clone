const express = require('express');
const routes = express();
const { body,validationResult } = require('express-validator');
const userModel = require('../models/userModels');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


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

routes.get('/login',(req,res)=>
{
    res.render('login');
})

routes.post('/login',
    body('email').trim().isEmail().isLength({min:13}),
    body('password').trim().isLength({min:8}),
    async (req,res)=> {
        
        const error=validationResult(req);
        if(!error.isEmpty()){
            return res.status(400).json({errors:error.array(),message:'Validation Error'});
        }

        const {email,password}=req.body;
        
        const user=await userModel.findOne({email:email});
        
        if(!user)
        {
            return res.status(400).json({message:'user not found',status:400});
        }

        const isUser=await bcrypt.compare(password,user.password);

        if(!isUser)
        {
            res.status(400).json({message:'Username or password is incorrect'})
        }

        const token=jwt.sign({
            userId:user._id,
            email:user.email,
            name:user.name
        },
        process.env.SECRET_KEY,
        )

        res.cookie('token',token);

        res.send('login successful');
    }
)

module.exports=routes;
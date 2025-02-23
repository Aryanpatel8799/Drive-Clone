const express = require('express');
const router = express();
const multer = require('multer');



router.get('/home',(req,res)=>
{
    res.render('home');
})

// router.post('/home',upload.single('file'),(req,res)=>
// {
//     res.send(req.file);
// })

module.exports=router;
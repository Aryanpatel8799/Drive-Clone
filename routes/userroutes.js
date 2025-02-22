const express = require('express');
const routes = express();

routes.get('/test',(req,res)=>
{
    res.send('testing route');
})

module.exports=routes;
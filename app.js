const express = require('express');
const app = express();
const UserRoute=require('./routes/userroutes');

app.set('view engine', 'ejs');

app.use('/user',UserRoute);

app.get('/register',(req,res)=>
{
    res.render('register');
})



app.listen(3000, () => {
    console.log('Server started on port 3000');
});
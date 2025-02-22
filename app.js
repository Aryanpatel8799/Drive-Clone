const express = require('express');
const app = express();
const UserRoute=require('./routes/userroutes');
const dotenv=require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
connectDB();

app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/user',UserRoute);


app.listen(3000, () => {
    console.log('Server started on port 3000');
});
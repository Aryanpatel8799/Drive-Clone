const { default: mongoose } = require("mongoose");
const Mongoose = require("mongoose");

const userSchema=Mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        minLength:3,
        lowerCase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        isEmail:true,
        lowerCase:true,
        minLength:13,
    },
    password:{
        type:String,
        required:true,
        trim:true,
        minLength:8,
    },
})

const userModel=mongoose.model("User",userSchema);
module.exports=userModel;
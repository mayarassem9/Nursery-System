const mongoose=require("mongoose");

const Schema=mongoose.Schema({
    _id:{
        type:Number,
        unique:true,
    },
    fullname:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    image:{
        type:String,
        required:true,
    }
});

module.exports=mongoose.model("teacher",Schema);

const mongoose=require("mongoose");

const Schema=mongoose.Schema({
    _id:{
        type:Number,
        unique:true,
    },
    name:{
        type:Number,
        required:true,
    },
    supsrvisor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"teachers",
    },
    children:[{
        type:[mongoose.Schema.Types.Number],
        ref:"child",
    }]
});

module.exports=mongoose.model("class",Schema);


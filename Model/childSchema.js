const mongoose=require("mongoose");

const addressSchema=mongoose.Schema({
        city:{
        type:String,
        required:true,
    },
        street:{
            type:String,
            required:true,
        },
        bulding:{
            type:Number,
            required:true,
        },
},
{_id:false}
);

const Schema=mongoose.Schema({
    _id:{
        type:Number,
        unique: true,
    },
    fullname:{
        type:Number,
        required: true,
    },
    age:{
        type:Number,
        required: true,
    },
    level:{
        type:String,
        required: true,
        Enumerator:["PreKG","KG1","KG2"]
    },
    address:{
        type: addressSchema,
        required: true
    },
});

module.exports=mongoose.model("child",Schema);

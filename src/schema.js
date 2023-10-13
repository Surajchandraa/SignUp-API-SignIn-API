const mongoose=require("mongoose");

let sch=new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },

    password:{
        type:String,
        require:true,
        

    },
    phone:{
        type:Number,
        require:true,

    }
})

module.exports=mongoose.model("user-data",sch);
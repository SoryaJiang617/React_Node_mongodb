const mongoose =require('mongoose')
const userSchema=mongoose.Schema({
    name:{
        type:String,
        required:[true,'please add a name']
    }
})
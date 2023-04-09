const mongoose = require('mongoose');
const HotelSchema = new mongoose.Schema({
    name:{
        type: String,
        required:true
    },
    description:{
        type: String,
        required:true
    },
    price:{
        type: Number,
       
    },
    rooms:{
        type: Number,
       
    }
})

module.exports =mongoose.model("Hotel", HotelSchema);
const mongoose = require('mongoose');

const playerschema = mongoose.Schema({
    PLAYER_NAME: {type: String , required:true },
    AGE: {type: String, required:true},
    TEAM_ABBREVIATION:{type: String,required : true},    
    NBA_FANTASY_PTS: {type : Number, default:0}
  });

  module.exports = mongoose.model("Player", playerschema);
const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  nickname: { type: String , required:true },
  accountpk:{type : String, default:""},
  rankpoints:{type : Number, default: 0},
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player',default:0}]
});

module.exports =mongoose.model("User", userSchema);
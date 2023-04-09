const mongoose = require('mongoose');




const userSchema = mongoose.Schema({
  firstname: { type: String , required:true },
  lastname: { type: String , required:true },
  email: { type: String, required:true },
  password: { type: String, required:true},
  profilePic: {type: String, required:false},
  phone: {type: String,required:true},
  birthday: {type: String,required:true},
  adress: {type: String,required:true},
  role: {type: String,default: 'User', Enumerator : ['User','Admin']},
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'player',default:0}],
  coins: {type: Number,default:0},
  rankpoints: {type: Number,default:0},
  isVerified:{type : Boolean,default:false},
  adresseth:{type : String, default:""},
  balanceInWei:{type : String, default:""},
  balanceInEth:{type : String, default:""},
});

module.exports =mongoose.model("User", userSchema);
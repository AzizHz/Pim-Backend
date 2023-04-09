const mongoose = require ('mongoose');

const cardSchema = new mongoose.Schema({
  playername: { type: String,required:true},
  cardlevel: { type: Number, default: 0 },
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: false },
  cardPic: { type: String },
  cardtype: {
    type: String,
    enum: ["Bronze", "Silver", "Gold", "Platinium", "Diamond", "Legendary"],
    default: "Bronze",
  },
});

cardSchema.pre("save", function (next) {
     if (this.cardlevel && this.cardlevel < 250 ) {
      this.cardtype = "Bronze";
    } else if (this.cardlevel && this.cardlevel < 500) {
      this.cardtype = "Silver";
    } else if (this.cardlevel && this.cardlevel < 1000) {
      this.cardtype = "Gold";
    } else if (this.cardlevel && this.cardlevel < 2000) {
      this.cardtype = "Platinum";
    } else if (this.cardlevel && this.cardlevel < 4000) {
      this.cardtype = "Diamond";
    } else if(this.cardlevel && this.cardlevel > 4000){
      this.cardtype = "Legendary";
    }
    next();
});


module.exports = mongoose.model("Card", cardSchema);

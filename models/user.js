const mongoose = require('mongoose');
const Player = require('../models/PlayersStats');

const userSchema = mongoose.Schema({
  nickname: { type: String, required: true },
  accountpk: { type: String, default: "" },
  rankpoints: { type: Number, default: 0 },
  team: [Player.schema]
});

module.exports = mongoose.model("User", userSchema);
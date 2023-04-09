const mongoose = require('mongoose');
const tokenSchema = mongoose.Schema({
  userid: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  token: { type: String, required: true },
});

module.exports =mongoose.model("Token", tokenSchema);
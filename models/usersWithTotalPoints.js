const mongoose = require('mongoose');


const usersWithTotalPoints = mongoose.Schema({
    id: {type: String, default: ""  },
    nickname: { type: String, default: "" },
    totalPoints:{ type: Number, default: 0 },

});
module.exports = mongoose.model("usersWithTotalPoints", usersWithTotalPoints);
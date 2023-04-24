const mongoose = require('mongoose');
const usersWithTotalPoints = require('../models/usersWithTotalPoints');

const GameWeekSchema = mongoose.Schema({
    GameWeekNumber:{type: Number, default: 1},
    Gameweek:[usersWithTotalPoints.schema]
});

module.exports = mongoose.model("GameWeek", GameWeekSchema);
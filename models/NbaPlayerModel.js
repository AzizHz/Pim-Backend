const mongoose = require('mongoose');

const Player = require('../models/PlayersStats');



const DataSchema = mongoose.Schema({
    DATE: {
        type: Date

    },
    players: [Player.schema]

});


module.exports = mongoose.model("Data", DataSchema);
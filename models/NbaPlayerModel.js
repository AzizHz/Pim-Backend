const mongoose = require('mongoose');



const DataSchema = mongoose.Schema({
    DATE: {
        type: Date

    },
    players: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Player',default:0}]

});


module.exports = mongoose.model("Data", DataSchema);
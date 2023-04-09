const mongoose = require('mongoose');

const nbaPlayerSchema = mongoose.Schema(
    {
        PLAYER_ID: {
            type: Number
        },
        PLAYER_NAME: {
            type: String
        },
        NICKNAME: {
            type: String
        },
        TEAM_ID: {
            type: Number
        },
        TEAM_ABBREVIATION: {
            type: String
        },
        AGE: {
            type: Number
        },
        GP: {
            type: Number
        },
        W: {
            type: Number
        },
        L: {
            type: Number
        },
        W_PCT: {
            type: Number
        },
        MIN: {
            type: Number
        },
        FGM: {
            type: Number
        },
        FGA: {
            type: Number
        },
        FG_PCT: {
            type: Number
        },
        FG3M: {
            type: Number
        },
        FG3A: {
            type: Number
        },
        FG3_PCT: {
            type: Number
        },
        FTM: {
            type: Number
        },
        FTA: {
            type: Number
        },
        FT_PCT: {
            type: Number
        },
        OREB: {
            type: Number
        },
        DREB: {
            type: Number
        },
        REB: {
            type: Number
        },
        AST: {
            type: Number
        },
        TOV: {
            type: Number
        },
        STL: {
            type: Number
        },
        BLK: {
            type: Number
        },
        BLKA: {
            type: Number
        },
        PF: {
            type: Number
        },
        PFD: {
            type: Number
        },
        PTS: {
            type: Number
        },
        PLUS_MINUS: {
            type: Number
        },
        NBA_FANTASY_PTS: {
            type: Number
        },
        DD2: {
            type: Number
        },
        TD3: {
            type: Number
        },
        WNBA_FANTASY_PTS: {
            type: Number
        },
        GP_RANK: {
            type: Number
        },
        W_RANK: {
            type: Number
        },
        L_RANK: {
            type: Number
        },
        W_PCT_RANK: {
            type: Number
        },
        MIN_RANK: {
            type: Number
        },
        FGM_RANK: {
            type: Number
        },
        FGA_RANK: {
            type: Number
        },
        FG_PCT_RANK: {
            type: Number
        },
        FG3M_RANK: {
            type: Number
        },
        FG3A_RANK: {
            type: Number
        },
        FG3_PCT_RANK: {
            type: Number
        },
        FTM_RANK: {
            type: Number
        },
        FTA_RANK: {
            type: Number
        },
        FT_PCT_RANK: {
            type: Number
        },
        OREB_RANK: {
            type: Number
        },
        DREB_RANK: {
            type: Number
        },
        REB_RANK: {
            type: Number
        },
        AST_RANK: {
            type: Number
        },
        TOV_RANK: {
            type: Number
        },
        STL_RANK: {
            type: Number
        },
        BLK_RANK: {
            type: Number
        },
        BLKA_RANK: {
            type: Number
        },
        PF_RANK: {
            type: Number
        },
        PFD_RANK: {
            type: Number
        },
        PTS_RANK: {
            type: Number
        },
        PLUS_MINUS_RANK: {
            type: Number
        },
        NBA_FANTASY_PTS_RANK: {
            type: Number
        },
        DD2_RANK: {
            type: Number
        },
        TD3_RANK: {
            type: Number
        },
        WNBA_FANTASY_PTS_RANK: {
            type: Number
        },
        POSITION: {
            type: String
        }
    }
);



const DataSchema = mongoose.Schema({
    DATE: {
        type: Date

    },
    players: [nbaPlayerSchema]

});


module.exports = mongoose.model("Data", DataSchema);
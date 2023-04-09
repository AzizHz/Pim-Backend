const Data = require('../models/NbaPlayerModel');



const axios = require('axios');
const express = require('express');

const player = require('../models/player');
const router = express.Router();

const config = {
    headers: {
        'Connection': 'keep-alive',
        'Accept': 'application/json, text/plain, /',
        'x-nba-stats-token': 'true',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
        'x-nba-stats-origin': 'stats',
        'Sec-Fetch-Site': 'same-origin',
        'Sec-Fetch-Mode': 'cors',
        'Referer': 'https://stats.nba.com/',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
    }
};
const url2 = 'https://stats.nba.com/stats/playerindex?College=&Country=&DraftPick=&DraftRound=&DraftYear=&Height=&Historical=1&LeagueID=00&Season=2022-23&SeasonType=Regular Season&TeamID=0&Weight='
const url = 'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=1&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2022-23&SeasonSegment=&SeasonType=Regular Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=';






exports.getData = async (req, res) => {
    const players = []
    const playersStat = []

    const response = await axios.get(url2, config);
    const rowset = response.data.resultSets[0].rowSet;
    await Promise.all(
        rowset.map(async (row) => {
            const jsonObject = {
                PERSON_ID: row[0],
                PLAYER_LAST_NAME: row[1],
                PLAYER_FIRST_NAME: row[2],
                PLAYER_SLUG: row[3],
                TEAM_ID: row[4],
                TEAM_SLUG: row[5],
                IS_DEFUNCT: row[6],
                TEAM_CITY: row[7],
                TEAM_NAME: row[8],
                TEAM_ABBREVIATION: row[9],
                JERSEY_NUMBER: row[10],
                POSITION: row[11],
                HEIGHT: row[12],
                WEIGHT: row[13],
                COLLEGE: row[14],
                COUNTRY: row[15],
                DRAFT_YEAR: row[16],
                DRAFT_ROUND: row[17],
                DRAFT_NUMBER: row[18],
                ROSTER_STATUS: row[19],
                PTS: row[20],
                REB: row[21],
                AST: row[22],
                STATS_TIMEFRAME: row[23],
                FROM_YEAR: row[24],
                TO_YEAR: row[25],
            };
            // Add the JSON object to the array
            players.push(jsonObject);
        })
    );

    axios.get(url, config)
        .then(response => {
            // Get the rowsets field
            const rowsets = response.data.resultSets[0].rowSet;


            // Create a JSON object for each row in the rowset
            for (const row of rowsets) {

                players.map((player) => {
                    if (player.PERSON_ID == row[0]) {
                        const jsonObject = { PLAYER_ID: row[0], PLAYER_NAME: row[1], NICKNAME: row[2], TEAM_ID: row[3], TEAM_ABBREVIATION: row[4], AGE: row[5], GP: row[6], W: row[7], L: row[8], W_PCT: row[9], MIN: row[10], FGM: row[11], FGA: row[12], FG_PCT: row[13], FG3M: row[14], FG3A: row[15], FG3_PCT: row[16], FTM: row[17], FTA: row[18], FT_PCT: row[19], OREB: row[20], DREB: row[21], REB: row[22], AST: row[23], TOV: row[24], STL: row[25], BLK: row[26], BLKA: row[27], PF: row[28], PFD: row[29], PTS: row[30], PLUS_MINUS: row[31], NBA_FANTASY_PTS: row[32], DD2: row[33], TD3: row[34], WNBA_FANTASY_PTS: row[35], GP_RANK: row[36], W_RANK: row[37], L_RANK: row[38], W_PCT_RANK: row[39], MIN_RANK: row[40], FGM_RANK: row[41], FGA_RANK: row[42], FG_PCT_RANK: row[43], FG3M_RANK: row[44], FG3A_RANK: row[45], FG3_PCT_RANK: row[46], FTM_RANK: row[47], FTA_RANK: row[48], FT_PCT_RANK: row[49], OREB_RANK: row[50], DREB_RANK: row[51], REB_RANK: row[52], AST_RANK: row[53], TOV_RANK: row[54], STL_RANK: row[55], BLK_RANK: row[56], BLKA_RANK: row[57], PF_RANK: row[58], PFD_RANK: row[59], PTS_RANK: row[60], PLUS_MINUS_RANK: row[61], NBA_FANTASY_PTS_RANK: row[26], DD2_RANK: row[63], TD3_RANK: row[64], WNBA_FANTASY_PTS_RANK: row[65], POSITION: player.POSITION };

                        // Add the JSON object to the array
                        playersStat.push(jsonObject);
                    }
                }
                )

            }


            // Convert the array of JSON objects to a JSON string
            const jsonString = JSON.stringify(playersStat);


            new Data({
                DATE: Date.now(),

                players: playersStat
            }).save()
                .then(data => {
                    res.json(data)
                })

            //res.json(playersStat);
            //console.log(players)
        })
        .catch(err => console.log(err));



}
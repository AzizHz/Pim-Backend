const axios = require('axios');

// Set your API key and the game ID you're interested in
const api_key = '804e78ce3c554528a0545ac4d66d825c';
const game_id = '19188';

// Set the API endpoint and query parameters for retrieving the player props odds
//const endpoint = `https://api.sportsdata.io/v3/nba/odds/json/BettingMarketsByGameID/${game_id}?key=${api_key}`;
const endpoint = `https://api.sportsdata.io/v3/nba/odds/json/GameOddsByDate/2023-03-12?key=804e78ce3c554528a0545ac4d66d825c`;
const params = {
    'key': api_key,
    'format': 'json'
};
var Homequota;
var Awayquota;
var objetlength;
var length;
// Query the API and retrieve the response data
axios.get(endpoint, { params })
    .then(response => {
        const data = response.data;
        const length = data.length;
        console.log(length);
        // var Homecouta;
        // var Awaycouta;
        // var Homeequipe;
        // var Awayequipe;
        const Homeequipe = data[1].HomeTeamName;
        const Homecouta = data[1].PregameOdds[0].HomeMoneyLine;
        const Awayequipe = data[1].AwayTeamName;
        const Awaycouta = data[1].PregameOdds[0].AwayMoneyLine;
        //  const equipe = data[1].BettingOutcomes[1].Participant;
        //  const couta = data[1].BettingOutcomes[1].PayoutAmerican;
        // data.map((item)=>{
        //     item.PregameOdds.map((item2) => {
        //  Homeequipe = item.HomeTeamName;
        //  Awayequipe = item.AwayTeamName;
        //  Homecouta = item2.HomeMoneyLine;
        //  Awaycouta = item2.AwayMoneyLine;


        if (Homecouta < 0) {
            Homequota = 1 - (100 / Homecouta)
        }
        else {
            Homequota = 1 + (Homecouta / 100)
        }
        if (Awaycouta > 0) {
            Awayquota = 1 + (Awaycouta / 100)
        }
        else {
            Awayquota = 1 - (100 / Awaycouta)
        }
        console.log(Homequota, Homeequipe, Awayquota, Awayequipe);
    })
    // })
    //     })
    .catch(error => {
        console.log(error);
    });
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
const url = 'https://stats.nba.com/stats/leaguedashplayerstats?College=&Conference=&Country=&DateFrom=&DateTo=&Division=&DraftPick=&DraftYear=&GameScope=&GameSegment=&Height=&LastNGames=1&LeagueID=00&Location=&MeasureType=Base&Month=0&OpponentTeamID=0&Outcome=&PORound=0&PaceAdjust=N&PerMode=PerGame&Period=0&PlayerExperience=&PlayerPosition=&PlusMinus=N&Rank=N&Season=2022-23&SeasonSegment=&SeasonType=Regular Season&ShotClockRange=&StarterBench=&TeamID=0&VsConference=&VsDivision=&Weight=';
axios.get(url, config)
    .then(res => console.log(res.data.resultSets[0].rowSet))
    .catch(err => console.log(err));
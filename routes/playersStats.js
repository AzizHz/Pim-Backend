const express = require('express');
const router = express.Router();
const players = require ("../controllers/PlayersStats");



router.get("/getAllPlayers", players.getAllPlayers);   

module.exports = router;
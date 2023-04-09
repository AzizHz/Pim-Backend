const express = require('express');
const router = express.Router();
const player = require ("../controllers/player");



router.get("/getPlayers", player.getPlayers);
router.get("/getPlayerById/:id", player.getPlayerById);
router.post("/addPlayer", player.addPlayer);
router.delete("/deletePlayer/:id", player.deletePlayer);


module.exports = router;
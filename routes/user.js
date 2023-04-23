const express = require('express');
const router = express.Router();
const user = require('../controllers/user');

router.get("/getUsers", user.getUsers);
//router.delete("/deleteUser/:id", user.deleteUser);
router.post("/AddPlayerToTeam/:userId/team/:playerId1/:playerId2/:playerId3/:playerId4/:playerId5", user.addPlayerToTeam);
//router.post('/RemovePlayerFromTeam/:userId/team/:playerId',user.removePlayerFromTeam)
router.post("/signup",user.signup);
//router.put("/updateUserrById/:id",user.updateUserrById);
//router.get('/getByIdUserrrr/:id',user.getByIdUserrrr);
router.get('/leaderboardGameWeek', user.leaderboardGameWeek);
router.get('/GlobalRank', user.GlobalRank);
module.exports = router;
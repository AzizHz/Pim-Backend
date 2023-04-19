const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const validate = require('../middleware/error-handler');
const metamask = require('../controllers/metamask');
const user = require('../controllers/user');
const { body } = require('express-validator');

//router.get("/getUsers", user.getUsers);
//router.delete("/deleteUser/:id", user.deleteUser);
router.post("/AddPlayerToTeam/:userId/team/:playerId1/:playerId2/:playerId3/:playerId4/:playerId5", user.addPlayerToTeam);
//router.post('/RemovePlayerFromTeam/:userId/team/:playerId',user.removePlayerFromTeam)
//router.post("/signup",user.signup);
//router.put("/updateUserrById/:id",user.updateUserrById);
//router.get('/getByIdUserrrr/:id',user.getByIdUserrrr);
module.exports = router;
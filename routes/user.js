const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');
const validate = require('../middleware/error-handler');
const metamask = require('../controllers/metamask');
const user = require('../controllers/user');
const { body } = require('express-validator');

router.post("/AddPlayerToTeam/:userId/team/:playerId1/:playerId2/:playerId3/:playerId4/:playerId5", user.addPlayerToTeam);
router.post("/signin",auth, user.signin);
router.post("/signup",multer,
[validate(
[body('firstname').isLength({min:2,max:50})],
[body('lastname').isLength({min:2,max:50})],
[body('phone').isLength({min:8,max:15})],
)],user.signup);
router.put("/updateUserrById/:id",multer, user.updateUserrById);
router.post("/addUserr", user.addUserr);
router.get("/getUsers", user.getUsers);
router.delete("/deleteUser/:id", user.deleteUser);
//router.post('/activateaccount',activateAccount)
router.get('/getByIdUserrrr/:id',user.getByIdUserrrr);
router.get('/balance', metamask, async (req, res) => {
    const balanceInWei = await web3.eth.getBalance(req.adresseth);
    const balanceInEth = web3.utils.fromWei(balanceInWei, 'ether');
    res.send(`Your balance is ${balanceInEth} ETH`);
  });
module.exports = router;
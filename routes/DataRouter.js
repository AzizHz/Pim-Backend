const express = require('express');
const router = express.Router();
const Data = require("../controllers/DataController.js");


router.get("/", Data.getData);
router.get("/lastData", Data.lastData);

module.exports = router;
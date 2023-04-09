const express = require('express');
const router= express.Router();
const multer2 = require('../middleware/multer2');
const card = require ("../controllers/cards.js");



router.get("/getCards", card.getCards);
router.get("/getCardsById/:id", card.getCardsById);
router.put("/updateCards/:id",multer2,card.updateCards);
router.post("/addCards",multer2,card.addCards);
router.delete("/deleteCards/:id", card.deleteCards);

 
module.exports = router;
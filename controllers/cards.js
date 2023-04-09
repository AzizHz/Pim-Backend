const Cards = require('../models/card.js');
const CardsModal = require('../models/card.js')

exports.getCards = async (req, res) => {
    try {   
  
      const ite = await Cards.find();    
      res.json(ite);
  } catch (error) {
   
      res.status(404).json({ message: error.message });
  }}



  
  exports.getCardsById = async (req, res) => {
    try {   
  
      const ite = await Cards.findById(req.params.id);    
      res.status(200).json(ite);
  } catch (error) {
   
      res.status(404).json({ message: error.message });
  }}

    exports.updateCards = async (req, res) => {
  try {
    let foundCards = await Cards.findOne({ _id: req.params.id });

    const updateImages = {};

    if (req.files?.cardPic) {

        // delete photo
        // check if we got files object
        if (req.files?.cardPic !== undefined) {
          // check if the user didn't have photo
          if (foundCards.cardPic !== '') {
            fs.unlinkSync(`${foundCards.cardPic}`);
          }
        }
        //  then update
        updateImages.cardPic = (req.files?.cardPic[0].path).replace('\\', '/');

    } 

    let updatedCards = await Cards.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...updateImages,
          cardtype: req.body.cartype ? req.body.cardtype : foundCards.cardtype,
          cardPic: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
         
        
        
        },
      },
      { new: true, upsert: true },
    );

    res.status(200).json({
      success: true,
      message: "Mise à jour réussie de l'utilisateur",
      updatedCar: updatedCards,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
exports.addCards = async (req, res) => {
  try {
    const { userid, cardlevel,playername } = req.body;

    const ite = new CardsModal({
      playername,
      userid,
      cardlevel,
      //cardPic: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
    });

    await ite.save();

    res.json(ite);
  } catch (err) {
    res.send("Error " + err);
  }
};
  exports.deleteCards = async (req, res) => {
    try{
        const p1 = await Cards.findByIdAndDelete(req.params.id)
        res.json(p1)

    }catch(err){
        res.send('Error '+ err)
    
  }}  
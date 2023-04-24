const PlayerModal = require ('../models/player');

exports.getPlayers = async (req, res) => {
    try {   
      const players = await PlayerModal.find();    
      res.status(200).json(players);
  } catch (error) {
   
      res.status(404).json({ message: error.message });
  }}

exports.deletePlayer = async (req, res) => {
    try {   
  
       await PlayerModal.findByIdAndDelete(req.params.id);    
      res.status(200).json("Player deleted");
  } catch (error) {
  
      res.status(404).json({ message: error.message });
  }
  }


  exports.addPlayer = async (req, res) => {
    try{
        const ite =  PlayerModal({
            PLAYER_NAME: req.body.PLAYER_NAME,
            AGE: req.body.AGE,
            EAM_ABBREVIATION: EAM_ABBREVIATION,
            NBA_FANTASY_PTS: req.body.NBA_FANTASY_PTS,
    })
  
        await ite.save()
        res.json(ite)
  
    }catch(err){
        res.send('Error '+ err)
    
  }}

  exports.getPlayerById = async (req, res) => {
    try {   
  
      const ite = await PlayerModal.findById(req.params.id);    
      res.status(200).json(ite);
  } catch (error) {
   
      res.status(404).json({ message: error.message });
  }}

  exports.updatePlayerById = async (req, res) => {
    try {
      let foundPlayer = await PlayerModal.findOne({ _id: req.params.id });
   
  
      let updatedPlayer = await PlayerModal.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            PLAYER_NAME: req.body.PLAYER_NAME ? req.body.PLAYER_NAME : foundPlayer.PLAYER_NAME,
            AGE: req.body.AGE ? req.body.AGE : foundPlayer.AGE,
            TEAM_ABBREVIATION: req.body.TEAM_ABBREVIATION ? req.body.TEAM_ABBREVIATION : foundPlayer.TEAM_ABBREVIATION,
            NBA_FANTASY_PTS: req.body.NBA_FANTASY_PTS ? req.body.NBA_FANTASY_PTS : foundPlayer.NBA_FANTASY_PTS,
          },
        },
        { new: true, upsert: true },
      );
  
      res.status(200).send(
        updatedPlayer
      );
    } catch (error) {
      res.status(500).json({
        message: "ghalta",
      });
    }
  };
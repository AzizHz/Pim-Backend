const PlayersModal = require ('../models/PlayersStats');



exports.getAllPlayers = async (req, res) => {
    try {   
      const playersStats = await PlayersModal.find();    
      res.status(200).json({playersStats, message : 'taaddet'});
  } catch (error) {
      res.status(404).json({ message: error.message });
  }}
const UserModal = require ('../models/user');
const PlayerModal = require ('../models/player');


exports.getUsers = async (req, res) => {
  try {   

    const users = await UserModal.find();    
    res.status(200).json(users);
} catch (error) {
 
    res.status(404).json({ message: error.message });
}}

exports.deleteUser = async (req, res) => {
  try {   

     await UserModal.findByIdAndDelete(req.params.id);    
    res.status(200).json("user deleted");
} catch (error) {

    res.status(404).json({ message: error.message });
}
}

exports.addPlayerToTeam = async (req,res) => {
  try {
    const user = await UserModal.findById(req.params.userId);
    const player1 = await PlayerModal.findById(req.params.playerId1);
    const player2 = await PlayerModal.findById(req.params.playerId2);
    const player3 = await PlayerModal.findById(req.params.playerId3);
    const player4 = await PlayerModal.findById(req.params.playerId4);
    const player5 = await PlayerModal.findById(req.params.playerId5);

    if (!user) {
      return res.status(404).send({ message: 'User not found!' });
    }

    if (!player1) {
      return res.status(404).send({ message: 'Player not found!' });
    }

    if (!player2) {
      return res.status(404).send({ message: 'Player not found!' });
    }

    if (!player3) {
      return res.status(404).send({ message: 'Player not found!' });
    }
    if (!player4) {
      return res.status(404).send({ message: 'Player not found!' });
    }
    if (!player5) {
      return res.status(404).send({ message: 'Player not found' });
    }


    user.team.push(player1._id,player2._id,player3._id,player4._id,player5._id);
    await user.save();

    res.send({ message: 'Team comfirmed',res: user });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}

exports.removePlayerFromTeam = async (req,res) => {
  try {
    const user = await UserModal.findById(req.params.userId);
    if (!user) {
      throw new Error('User not found');
    }

    const index = user.team.indexOf(req.params.playerId);
    if (index === -1) {
      throw new Error('Player not found in team');
    }
    user.team.splice(index, 1);
    await user.save();
    res.status(200).json(user);
  } catch (error) {
    res.status(500).send({ message: 'Server error' });
  }
}

exports.signup = async (req, res) => {
  const { nickname,accountpk}= req.body;
  try {
    const oldUser = await UserModal.findOne({ accountpk });

    if (oldUser)
      return res.status(400).json({ message: "Account already exists" });


    const result = await UserModal.create({
      nickname,
      accountpk
    });

    res.status(200).json({result});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateUserrById = async (req, res) => {
  try {
    let foundUser = await UserModal.findOne({ _id: req.params.id }); 

    let updatedUser = await UserModal.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          nickname: req.body.nickname ? req.body.nickname : foundUser.nickname
        },
      },
      { new: true, upsert: true },
    );

    res.status(200).send(
      updatedUser
    );
  } catch (error) {
    res.status(500).json({
      message: "id ghalet ya weldi weeeey",
    });
  }
};

exports.getByIdUserrrr = async (req, res) => {
  try {   
    const ite = await UserModal.findById(req.params.id);    
    res.status(200).json(ite);
} catch (error) {
    res.status(404).json({ message: error.message });
}}
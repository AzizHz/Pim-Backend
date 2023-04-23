const UserModal = require('../models/user');
const Data = require('../models/dataModel')
const GameWeekRank = require('../models/GameWeekRank');


exports.getUsers = async (req, res) => {
  try {

    const users = await UserModal.find();
    res.status(200).json(users);
  } catch (error) {

    res.status(404).json({ message: error.message });
  }
}

exports.deleteUser = async (req, res) => {
  try {
    await UserModal.findByIdAndDelete(req.params.id);
    res.status(200).json("user deleted");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
}

exports.addPlayerToTeam = async (req, res) => {
  try {
    const players = [req.params.playerId1, req.params.playerId2, req.params.playerId3, req.params.playerId4, req.params.playerId5]
    data = await Data.findOne({}, null, { sort: { _id: -1 } });

    const filteredData = data.players.filter(obj => players.includes(obj.PLAYER_ID.toString()));
    UserModal.findByIdAndUpdate(req.params.userId, { $set: { team: [] } }, { new: true }, (error, user) => {
      if (error) {
        console.log(error);
      } else {
        user.team.push(...filteredData);
        user.save((error, updatedUser) => {
          if (error) {
            console.log(error);
          } else {
            res.send({ message: 'Team comfirmed', res: updatedUser });

          }
        });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}

exports.removePlayerFromTeam = async (req, res) => {
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
  const { nickname, accountpk } = req.body;
  try {
    const oldUser = await UserModal.findOne({ accountpk });

    if (oldUser)
      return res.status(400).json({ message: "Account already exists" });


    const result = await UserModal.create({
      nickname,
      accountpk
    });

    res.status(200).json({ result });
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
  }
}

exports.browseTeamAttribute = async (req, res) => {
  try {
    const user = await UserModal.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    let totalPoints = 0;
    user.team.forEach((player) => {
      console.log(player.NBA_FANTASY_PTS)
      totalPoints += player.NBA_FANTASY_PTS;
    });
    res.status(200).json({totalPoints});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.leaderboardGameWeek = async (req, res) => {
  try {
    const users = await UserModal.find();
    let usersWithTotalPoints = [];
    users.forEach((user) => {
      let totalPoints = 0;
      user.team.forEach((player) => {
        totalPoints += player.NBA_FANTASY_PTS;
      });
      usersWithTotalPoints.push({id: user.id,nickname: user.nickname, totalPoints: totalPoints});
      user.rankpoints += totalPoints; // Increment rankpoints for the user
      user.save();
    });
    let num=1;
    const GameWeeknum = await GameWeekRank.find();
    GameWeeknum.forEach((gameweeks)=>
    {
      num = gameweeks.GameWeekNumber + 1
    });
    console.log(num);
    const gm = await GameWeekRank.create({ 
      GameWeekNumber: num,
      Gameweek: usersWithTotalPoints,
    });
    usersWithTotalPoints.sort((a, b) => {
      return b.totalPoints - a.totalPoints;
    });
    res.status(200).json(gm);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
exports.GlobalRank = async (req, res) => {
  try {
    const users = await UserModal.find().sort({ rankpoints: -1 });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
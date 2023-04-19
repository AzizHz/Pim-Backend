<<<<<<< HEAD

const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');
const multer = require ('multer');
const UserModal = require ('../models/user');
const PlayerModal = require ('../models/player');
const TokenModal = require ('../models/token');
=======
const UserModal = require('../models/user');
const PlayerModal = require('../models/player');
const Data = require('../models/NbaPlayerModel')
>>>>>>> 757915c (changes made by aziz)


const secret = process.env.secret;
const BASE_URL = process.env.BASE_URL;

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
<<<<<<< HEAD
    const user = await UserModal.findById(req.params.userId);
    const player = await PlayerModal.findById(req.params.playerId);

    if (!user) {
      return res.status(404).send({ message: 'User not found' });
    }

    if (!player) {
      return res.status(404).send({ message: 'Player not found' });
    }

    user.team.push(player._id);
    await user.save();

    res.send({ message: 'Player added to team' });
=======


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
>>>>>>> 757915c (changes made by aziz)
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Server error' });
  }
}

<<<<<<< HEAD
=======
exports.removePlayerFromTeam = async (req, res) => {
  try {
    const user = await UserModal.findById(req.params.userId);
    if (!user) {
      throw new Error('User not found');
    }
>>>>>>> 757915c (changes made by aziz)


/* export const activateAccount = async (req, res) => {
  const { licensekey, userid } = req.body;
  const license_key = await licensekeyModal.findOne({
    license_key: licensekey,
  });
  if (!license_key)
    return res.status(400).json({ message: "this license key is invalid" });
  if (!license_key.isActivated) {
    const user = await UserModal.findOne({ _id: userid });
    var today = new Date();
    today.setDate(today.getDate() + license_key.duration);
    user.active_until = today;
    user.role = license_key.type;
    user.save();
    license_key.isActivated = true;
    license_key.save();
    return res.status(200).json(user);
  } else {
    return res
      .status(400)
      .json({ message: "this license key is already used" });
  }
}; */

exports.signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await UserModal.findOne({ email });

    if (!oldUser)
      return res.status(404).json({ message: "Email adress doesn't exist !" });

    const isPasswordCorrect = await bcrypt.compare(password, oldUser.password);

    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid password !" });

    const token = jwt.sign(
      { email: oldUser.email, id: oldUser._id },
      process.env.SECRET,
      {
        expiresIn: "1h",
      }
    );

   
    res.status(200).json({ result: oldUser, token });
  } catch (err) {
    res.status(500).json({ error: err.message});
  }
};

exports.signup = async (req, res) => {
<<<<<<< HEAD
  const { email, password, firstname, lastname, phone, birthday, adress, role, adresseth, balanceInWei, balanceInEth}= req.body;
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password must be at least 8 characters long' });
  }
=======
  const { nickname, accountpk } = req.body;
>>>>>>> 757915c (changes made by aziz)
  try {
    const oldUser = await UserModal.findOne({ email });

    if (oldUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 12);


    const result = await UserModal.create({
      email,
      role,
    

      password: hashedPassword,
      firstname: `${firstname}`,
      lastname: `${lastname}`,
      phone: `${phone}`,
      birthday: `${birthday}`,
      adress: `${adress}`,
      //profilePic: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
    });
    


    const tokenn = jwt.sign({ email: result.email, id: result._id }, process.env.SECRET, {  expiresIn: "1h",});
    const AddedToken = await TokenModal.create({
      userid : result._id,
      token : tokenn
    });

<<<<<<< HEAD
    res.status(200).json({ result,AddedToken, tokenn });
=======
    res.status(200).json({ result });
>>>>>>> 757915c (changes made by aziz)
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
/*
export const forgetPass = async (req, res) => {
*/


exports.updateUserrById = async (req, res) => {
  try {
    let foundUser = await UserModal.findOne({ _id: req.params.id });
<<<<<<< HEAD

    const updateImages = {};

    if (req.files?.profilePic) {

        // delete photo
        // check if we got files object
        if (req.files?.profilePic !== undefined) {
          // check if the user didn't have photo
          if (foundUser.profilePic !== '') {
            fs.unlinkSync(`${foundUser.profilePic}`);
          }
        }
        //  then update
        updateImages.profilePic = (req.files?.profilePic[0].path).replace('\\', '/');

    } 
=======
>>>>>>> 757915c (changes made by aziz)

    let updatedUser = await UserModal.findOneAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          ...updateImages,
          email: req.body.email ? req.body.email : foundUser.email,
          profilePic: `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
          firstname: req.body.firstname ? req.body.firstname : foundUser.firstname,
          lastname: req.body.lastname ? req.body.lastname : foundUser.lastname,
          password: req.body.password ? req.body.password : foundUser.password,
          phone: req.body.phone ? req.body.phone : foundUser.phone,
          birthday: req.body.birthday ? req.body.birthday : foundUser.birthday,
          adress: req.body.adress ? req.body.adress : foundUser.adress,
          role: req.body.role ? req.body.role : foundUser.role,
          coins: req.body.coins ? req.body.coins : foundUser.coins,
          rankpoints: req.body.rankpoints ? req.body.rankpoints : foundUser.rankpoints ,
          //role: req.body.role ? req.body.role : foundUser.role,
        
        },
      },
      { new: true, upsert: true },
    );

    res.status(200).send(
      updatedUser
    );
  } catch (error) {
    res.status(500).json({
      message: "ghalta",
    });
  }
};


exports.addUserr = async (req, res) => {
  try{
      const ite =  new UserModal({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        role: req.body.role,
        password: req.body.password,
        phone: req.body.phone ,
        birthday: req.body.birthday ,
        adress: req.body.adress ,
       
        profilePic :`${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`,
  })

      await ite.save()
      res.json(ite)

  }catch(err){
      res.send('Error '+ err)
  
}}
exports.getByIdUserrrr = async (req, res) => {
<<<<<<< HEAD
  try {   

    const ite = await UserModal.findById(req.params.id);    
    res.status(200).json(ite);
} catch (error) {
 
=======
  try {
    const ite = await UserModal.findById(req.params.id);
    res.status(200).json(ite);
  } catch (error) {
>>>>>>> 757915c (changes made by aziz)
    res.status(404).json({ message: error.message });
  }
}
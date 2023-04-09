const jwt =require('jsonwebtoken');



const secret = 'test';
/*
const auth = async (req, res, next) => {
  try {
    
    const token = req.headers.authorization.split(" ")[1];
    const isCustomAuth = token.length < 500;

    let decodedData;

    if (token && isCustomAuth) {      
      decodedData = jwt.verify(token, secret);

      req.userId = decodedData?.id;
    } else {
      decodedData = jwt.decode(token);

      req.userId = decodedData?.sub;
    }    
console.log(token) ;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
*/

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET); // Verify token with secret
    req.user = decodedToken;
    res.cookie('token', token, { httpOnly: true });
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
module.exports = auth;
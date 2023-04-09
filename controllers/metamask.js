const Web3 = require('web3')
const web3 = new Web3('https://mainnet.infura.io/v3/alley-oop');



async function mymetamaskk(req, res, next) {
    if (window.ethereum) {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const addresseth = accounts[0];
      console.log(`User's address: ${addresseth}`);
      req.userAddress = addresseth;
      next();
    } else {
      console.error('Metamask not detected');
      res.status(400).send('Metamask not detected');
    }
  }
  async function mymetamask(req, res, next) {
    try {
      const accounts = await web3.eth.getAccounts();
      const addresseth = accounts[0];
      console.log(`User's address: ${addresseth}`);
      req.userAddress = addresseth;
      next();
    } catch (error) {
      console.error('Metamask not detected');
      res.status(400).send('Metamask not detected');
    }
  }
  module.exports=mymetamaskk;
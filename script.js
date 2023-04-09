const {Network,Alchemy} = require('alchemy-sdk');

const settings = {
    apiKey: "W2_28qtcKNUQlUqj5fG1S3DuAOU9kYh8",
    network: Network.ETH_MAINNET,
};

const alchemy = new Alchemy(settings);

// get the latest block
const latestBlock = alchemy.core.getBlock("latest").then(console.log);
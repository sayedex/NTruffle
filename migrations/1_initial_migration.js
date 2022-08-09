  const SmartChefFactory = artifacts.require("SmartChefFactory");
  var meta;
  let stake ="0x4A9A9E9F50E6Df8936de1F9d02A0cCaB91d5c205";
let reward ="0xb9CB2834caA590De370F9F854123b5098080EDcB";
let _rewardPerBlock = 100;
let _startBlock = 12736477;
let _bonusEndBlock = 13736535;
let _poolLimitPerUser = 1000;
let _numberBlocksForUserLimit = 1000;
let admin  = "0x7D87Dc3dbAfad295f272e5eC1abc1b76a60Af7DD"
 module.exports = function (deployer) {
    deployer.deploy(SmartChefFactory).then(function(instance) {
      meta = instance;
      return meta.deployPool(stake,reward,_rewardPerBlock,_startBlock ,_bonusEndBlock,_poolLimitPerUser,_numberBlocksForUserLimit,admin,{from: admin});
    }).then(function(result) {
      // If this callback is called, the transaction was successfully processed.
    console.log(result);
    }).catch(function(e) {
      // There was an error! Handle it.
      console.log(e);
    })
};
//const ERC721NFTMarketV1  artifacts.require("ERC721NFTMarketV1");

// module.exports = function (deployer) {
//    deployer.deploy(ERC721NFTMarketV1,"0x7D87Dc3dbAfad295f272e5eC1abc1b76a60Af7DD","0x8bd1310e65d9ca21f00ae7259d86D065B38bA7C1","0x6a822567525660dd7d8A55e116DdCC30072989c4","1","1000000000000000000000000000000000000000000000");
//   };



// const NFTCollectible = artifacts.require("NFTCollectible");

//  module.exports = function (deployer) {
//    deployer.deploy(NFTCollectible,"https://gateway.pinata.cloud/ipfs/QmWGCQfA91znG6MKQUoeMvcifjM6mPAt4EH7xBgtRZaiTQ/","0xbe397a59186c9bf19dc618484690d99bfabf988ce2a5fc2e25ff5823d66bfa1b");
//  };


// SmartChefFactory.deployed().then(function(instance) {
//    meta = instance;
//    return meta.deployPool(stake,reward,_rewardPerBlock,_startBlock ,_bonusEndBlock,_poolLimitPerUser,_numberBlocksForUserLimit,admin,{from: admin});
//  }).then(function(result) {
//    // If this callback is called, the transaction was successfully processed.
//    alert("Transaction successful!")
//  }).catch(function(e) {
//    // There was an error! Handle it.
//  })



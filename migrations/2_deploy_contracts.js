const VoteToken = artifacts.require("VoteToken");

module.exports =async  function(deployer) {
  await deployer.deploy(VoteToken);
};

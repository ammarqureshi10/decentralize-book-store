const BookMarketPlace = artifacts.require("BookMarketPlace");

module.exports = function (deployer) {
  deployer.deploy(BookMarketPlace);
};

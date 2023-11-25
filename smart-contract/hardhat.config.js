require("@nomicfoundation/hardhat-toolbox");
require("@openzeppelin/hardhat-upgrades");
require("dotenv").config();
require("solidity-coverage");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
    defaultNetwork: "hardhat",
    networks: {
        hardhat: {},
        baobab: {
            url: "https://public-en-baobab.klaytn.net", //https://klaytn-baobab-rpc.allthatnode.com:8551
            accounts: [process.env.DEPLOYER_PRIVATE_KEY],
        },
    },
    solidity: {
        version: "0.8.20",
        settings: {
            optimizer: {
                enabled: true,
                runs: 1000,
            },
        },
    },
};

const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main(d) {
    // Deploying
    const DigiGold = await ethers.getContractFactory("DigiGold");
    const instance = await upgrades.deployProxy(
        DigiGold,
        [
            process.env.DEPLOYER_WALLET_ADDRESS, //defaultAdmin
            process.env.DEPLOYER_WALLET_ADDRESS, //pauser
            process.env.DEPLOYER_WALLET_ADDRESS, //minter
            process.env.DEPLOYER_WALLET_ADDRESS, //upgrader
        ],
        { initializer: "initialize", kind: "uups" }
    );
    await instance.waitForDeployment();

    console.table({
        address: await instance.getAddress(),
        name: await instance.name(),
        symbol: await instance.symbol(),
        decimals: await instance.decimals(),
        totalSupply: await instance.totalSupply(),
    });

    // Upgrading
    // const DigiGoldV2 = await ethers.getContractFactory("DigiGoldV2");
    // const upgraded = await upgrades.upgradeProxy(
    //     await instance.getAddress(),
    //     DigiGoldV2
    // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

// ┌─────────────┬──────────────────────────────────────────────┐
// │   (index)   │                    Values                    │
// ├─────────────┼──────────────────────────────────────────────┤
// │   address   │ '0x84E20b4c8A87A45058bA767B4efE6f323825897a' │
// │    name     │                  'DigiGold'                  │
// │   symbol    │                   'DGOLD'                    │
// │  decimals   │                     18n                      │
// │ totalSupply │           1562000000000000000000n            │
// └─────────────┴──────────────────────────────────────────────┘
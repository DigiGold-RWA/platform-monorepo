const { ethers, upgrades } = require("hardhat");

async function main() {
    // Deploying
    const DigiGold = await ethers.getContractFactory("DigiGold");
    const instance = await upgrades.deployProxy(DigiGold, []);
    await instance.waitForDeployment();

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

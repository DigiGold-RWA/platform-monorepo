const { ethers, upgrades } = require("hardhat");

async function main() {
    // Deploying
    const SimpleVault = await ethers.getContractFactory("SimpleVault");
    const instance = await upgrades.deployProxy(SimpleVault, []);
    await instance.waitForDeployment();

    // Upgrading
    // const SimpleVaultV2 = await ethers.getContractFactory("SimpleVaultV2");
    // const upgraded = await upgrades.upgradeProxy(
    //     await instance.getAddress(),
    //     SimpleVaultV2
    // );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

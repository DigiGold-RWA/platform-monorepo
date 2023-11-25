const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
    // Deploying
    const DigiGold = await ethers.getContractFactory("DigiGold");
    const instance = await DigiGold.attach(
        "0x84E20b4c8A87A45058bA767B4efE6f323825897a"
    );

    const DEFAULT_ADMIN_ROLE = ethers.keccak256(
        ethers.toUtf8Bytes("DEFAULT_ADMIN_ROLE")
    );
    const MINTER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("MINTER_ROLE"));
    const PAUSER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("PAUSER_ROLE"));
    const UPGRADER_ROLE = ethers.keccak256(ethers.toUtf8Bytes("UPGRADER_ROLE"));

    const adminRole = await instance.hasRole(
        DEFAULT_ADMIN_ROLE,
        process.env.DEPLOYER_WALLET_ADDRESS
    );
    const minterRole = await instance.hasRole(
        MINTER_ROLE,
        process.env.DEPLOYER_WALLET_ADDRESS
    );
    const pauserRole = await instance.hasRole(
        PAUSER_ROLE,
        process.env.DEPLOYER_WALLET_ADDRESS
    );
    const upgraderRole = await instance.hasRole(
        UPGRADER_ROLE,
        process.env.DEPLOYER_WALLET_ADDRESS
    );

    // await instance.transfer(
    //     "0xDd9b7e72d2cb00760f6c9105a52A32a60f604996",
    //     ethers.parseEther("500")
    // );

    console.table({
        adminRole,
        minterRole,
        pauserRole,
        upgraderRole,
        exchangeBalance: await instance.balanceOf(
            "0xDd9b7e72d2cb00760f6c9105a52A32a60f604996"
        ),
        deployerBalance: await instance.balanceOf(
            process.env.DEPLOYER_WALLET_ADDRESS
        ),
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});

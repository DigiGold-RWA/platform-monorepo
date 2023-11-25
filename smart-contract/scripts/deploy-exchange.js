const { ethers, upgrades } = require("hardhat");
require("dotenv").config();

async function main() {
    // Deploying
    const DigiGoldExchange =
        await ethers.getContractFactory("DigiGoldExchange");
    const instance = await upgrades.deployProxy(DigiGoldExchange, [
        process.env.DEPLOYER_WALLET_ADDRESS, //defaultAdmin
        process.env.DEPLOYER_WALLET_ADDRESS, //upgrader
        ethers.parseEther("300"), //_minimumExchange in $KLAY
        "0x5f1D26EBe62f16168C0253a8CA493708BEb94e7a", //_klayUsdOracleAddress
        "0xF9f03659aA419D11280e2fDa2dF875589432608F", //_goldUsdOracleAddress
        "0x84E20b4c8A87A45058bA767B4efE6f323825897a", //_dGoldTokenAddress
        "0x981B43722D6A02Debf96CAA604FA22357A75BFA5", //_feeRecipient
    ]);
    await instance.waitForDeployment();

    console.table({
        address: await instance.getAddress(),
    });

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


// ┌─────────┬──────────────────────────────────────────────┐
// │ (index) │                    Values                    │
// ├─────────┼──────────────────────────────────────────────┤
// │ address │ '0xDd9b7e72d2cb00760f6c9105a52A32a60f604996' │
// └─────────┴──────────────────────────────────────────────┘
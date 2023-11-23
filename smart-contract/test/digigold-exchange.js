const {
    loadFixture,
    time,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const TEN_TOKENS = ethers.parseEther("10");

describe("Simple Vault Exchange", function () {
    async function deployExchangeFixture() {
        // Contracts are deployed using the first signer/account by default
        const [admin, pauser, user, anotherUser, feeRecipient] =
            await ethers.getSigners();

        const DigiGold = await ethers.getContractFactory("DigiGold");
        const token = await upgrades.deployProxy(
            DigiGold,
            [admin.address, pauser.address, pauser.address, admin.address],
            { initializer: "initialize", kind: "uups" }
        );

        await token.waitForDeployment();

        const klayPrice = ethers.parseUnits("0.223", 9); //How DigiOralce returns the price of KLAY to USD using 1e9 decimals
        const klayUsdOracleMock = await ethers.deployContract(
            "KlayUsdOracleMock",
            [ethers.toBeHex(klayPrice, 32)]
        );

        const goldPrice = ethers.parseUnits("64.0", 9); //How DigiOralce returns the price of 1g Gold to USD using 1e9 decimals

        const goldUsdOracleMock = await ethers.deployContract(
            "GoldUsdOracleMock",
            [ethers.toBeHex(goldPrice, 32)]
        );

        const DigiGoldExchange =
            await ethers.getContractFactory("DigiGoldExchange");
        const exchange = await upgrades.deployProxy(
            DigiGoldExchange,
            [
                admin.address,
                admin.address,
                ethers.parseEther("300"),
                await klayUsdOracleMock.getAddress(),
                await goldUsdOracleMock.getAddress(),
                await token.getAddress(),
                feeRecipient.address,
            ],
            { initializer: "initialize", kind: "uups" }
        );
        await exchange.waitForDeployment();

        return {
            admin,
            pauser,
            minter: pauser,
            token,
            user,
            anotherUser,
            goldPrice,
            klayPrice,
            klayUsdOracleMock,
            goldUsdOracleMock,
            exchange,
            feeRecipient,
        };
    }

    describe("Swapping $KLAY for $DGOLD", function () {
        it("Should confirm klay-usdprice to be 0.223  and 1g gold-usd $64", async function () {
            const { exchange } = await loadFixture(deployExchangeFixture);

            await exchange.fectchLatestPrices();

            await wait(3000); //Give time for the oracle to update the price => 3 seconds

            const klayUsdPrice = await exchange.klayUsdPrice();
            const goldUsdPrice = await exchange.goldUsdPrice();

            expect(ethers.formatUnits(klayUsdPrice, 9)).to.equal("0.223");
            expect(ethers.formatUnits(goldUsdPrice, 9)).to.equal("64.0");
        });
    });
});

const wait = (ms) => new Promise((rs) => setTimeout(rs, ms));

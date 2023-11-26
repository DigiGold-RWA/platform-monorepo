const {
    loadFixture,
    time,
} = require("@nomicfoundation/hardhat-network-helpers");
const { expect } = require("chai");

const THREEHUNDERED_ETHER = ethers.parseEther("300");

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
                THREEHUNDERED_ETHER,
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

        it("Should swap 300 KLAY ~ 0.223 * 300 = 66.9 with out before fee = 1.0453125, after fee = and fee in gold = ", async function () {
            const { exchange, user } = await loadFixture(deployExchangeFixture);

            await exchange.fectchLatestPrices();

            await wait(3000); //Give time for the oracle to update the price => 3 seconds

            //@Todo - Add more test cases
            const cases = [
                {
                    amount: THREEHUNDERED_ETHER,
                    expectedGoldOut: ethers.parseEther("1.0453125"),
                    expectedGoldBalAfterFee: ethers.parseEther("1.02440625"),
                    expectedMintFee: ethers.parseEther("0.02090625"),
                },
            ];

            for (const c of cases) {
                const [amountOfGold, goldBalAfterFee, mintFee] =
                    await exchange.calculateGoldOutAndFee(c.amount);

                expect(amountOfGold).to.equal(c.expectedGoldOut);
                expect(goldBalAfterFee).to.equal(c.expectedGoldBalAfterFee);
                expect(mintFee).to.equal(c.expectedMintFee);
            }
        });

        it.only("Should swap 300 KLAY for $DGOLD. Send 1.02440625 $DGOLD to buyer and fee of 0.02090625 to feeRecipient", async function () {
            const { exchange, user, feeRecipient, token, minter } =
                await loadFixture(deployExchangeFixture);

            //Mint 20,000 $DGOLD to the exchange
            await token
                .connect(minter)
                .mint(await exchange.getAddress(), ethers.parseEther("2"));

            await exchange.fectchLatestPrices();

            await wait(3000); //Give time for the oracle to update the price => 3 seconds

            //@Todo - Add more test cases
            const cases = [
                {
                    amount: THREEHUNDERED_ETHER,
                    expectedGoldOut: ethers.parseEther("1.0453125"),
                    expectedGoldBalAfterFee: ethers.parseEther("1.02440625"),
                    expectedMintFee: ethers.parseEther("0.02090625"),
                    exchangeGoldBal: ethers.parseEther("0.9546875"),
                },
            ];

            for (const c of cases) {
                await user.sendTransaction({
                    to: await exchange.getAddress(),
                    value: c.amount,
                    data: "0x0123456789abcdef", //Invalid data to trigger fallback function
                });

                await wait(3000); // Transaction is fully mined after 3 seconds

                const userGoldBal = await token.balanceOf(user.address);
                const feeRecipientGoldBal = await token.balanceOf(
                    feeRecipient.address
                );
                const exchangeGoldBal = await token.balanceOf(
                    await exchange.getAddress()
                );
                const exchangeKlayBal = await ethers.provider.getBalance(
                    await exchange.getAddress()
                );

                expect(exchangeKlayBal).to.equal(THREEHUNDERED_ETHER);
                expect(exchangeGoldBal).to.equal(c.exchangeGoldBal);
                expect(userGoldBal).to.equal(c.expectedGoldBalAfterFee);
                expect(feeRecipientGoldBal).to.equal(c.expectedMintFee);
            }
        });
    });
});

const wait = (ms) => new Promise((rs) => setTimeout(rs, ms));

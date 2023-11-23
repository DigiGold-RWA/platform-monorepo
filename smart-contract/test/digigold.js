const { loadFixture } = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

const TEN_TOKENS = ethers.parseEther("10");

describe("DigiGold Token", function () {
    async function deployTokenFixture() {
        // Contracts are deployed using the first signer/account by default
        const [admin, pauser, user, anotherUser] = await ethers.getSigners();

        const DigiGold = await ethers.getContractFactory("DigiGold");
        const token = await upgrades.deployProxy(
            DigiGold,
            [admin.address, pauser.address, pauser.address, admin.address],
            { initializer: "initialize", kind: "uups" }
        );

        await token.waitForDeployment();

        return { admin, pauser, minter: pauser, token, user, anotherUser };
    }

    describe("Token", function () {
        it("Should allow minter to mint", async function () {
            const { token, user, minter } =
                await loadFixture(deployTokenFixture);
            await token.connect(minter).mint(user.address, TEN_TOKENS);
            expect(await token.balanceOf(user.address)).to.equal(TEN_TOKENS);
        });

        it("Should allow burner to burn", async function () {
            const { token, user, minter } =
                await loadFixture(deployTokenFixture);

            await token.connect(minter).mint(user.address, TEN_TOKENS);
            await token.connect(minter).burnFromUser(user.address, TEN_TOKENS);

            expect(await token.balanceOf(user.address)).to.equal(0);
        });

        it("Should not allow non minter wallet  to mint", async function () {
            const { token, user, admin } =
                await loadFixture(deployTokenFixture);
            try {
                await token.connect(admin).mint(user.address, TEN_TOKENS);
            } catch (error) {
                const hashMinterRole =
                    "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6"; //keccak256("MINTER_ROLE")
                expect(error.message).to.equal(
                    `VM Exception while processing transaction: reverted with custom error 'AccessControlUnauthorizedAccount("${admin.address}", "${hashMinterRole}")'`
                );
            }
        });

        it("Should not allow non minter wallet to burn", async function () {
            const { token, user, admin, minter } =
                await loadFixture(deployTokenFixture);
            try {
                await token.connect(minter).mint(user.address, TEN_TOKENS);
                await token
                    .connect(admin)
                    .burnFromUser(user.address, TEN_TOKENS);
            } catch (error) {
                expect(error.message).to.equal(
                    `VM Exception while processing transaction: reverted with custom error 'AccessControlUnauthorizedAccount("${admin.address}", "0x9f2df0fed2c77648de5860a4cc508cd0818c85b8b8a1ab4ceeef8d981c8956a6")'`
                );
            }
        });

        it("Should not initialize upgrable contract", async function () {
            const { admin, pauser, minter, token } =
                await loadFixture(deployTokenFixture);

            try {
                await token.initialize(
                    admin.address,
                    pauser.address,
                    minter.address,
                    admin.address
                );
            } catch (error) {
                expect(error.message).to.equal(
                    `VM Exception while processing transaction: reverted with custom error 'InvalidInitialization()'`
                );
            }
        });

        it("Should not allow blacklist wallet to transfer or receive", async function () {
            const { token, user, anotherUser, admin, minter } =
                await loadFixture(deployTokenFixture);

            await token.connect(minter).mint(anotherUser.address, TEN_TOKENS);

            await token.connect(admin).addToBlockedList(user.address);

            expect(await token.isBlocked(user.address)).to.equal(true);
            await expect(
                token.connect(user).transfer(anotherUser.address, TEN_TOKENS)
            ).to.revertedWith("transfers are blocked for user");
        });

        it("Should not allow blacklist wallet to burn", async function () {
            const { token, user, admin, minter } =
                await loadFixture(deployTokenFixture);

            await token.connect(minter).mint(user.address, TEN_TOKENS);

            await token.connect(admin).addToBlockedList(user.address);

            expect(await token.isBlocked(user.address)).to.equal(true);
            await expect(token.connect(user).burn(TEN_TOKENS)).to.revertedWith(
                "transfers are blocked for user"
            );
        });

        it("Should not allow blacklist wallet to transferFrom", async function () {
            const { token, user, anotherUser, admin, minter } =
                await loadFixture(deployTokenFixture);

            await token.connect(minter).mint(user.address, TEN_TOKENS);
            await token.connect(user).approve(anotherUser.address, TEN_TOKENS);
            await token.connect(admin).addToBlockedList(user.address);

            expect(await token.isBlocked(user.address)).to.equal(true);
            expect(
                await token.allowance(user.address, anotherUser.address)
            ).to.equal(TEN_TOKENS);

            await expect(
                token
                    .connect(anotherUser)
                    .transferFrom(user.address, anotherUser.address, TEN_TOKENS)
            ).to.revertedWith("Sender is blocked");
        });
    });
});

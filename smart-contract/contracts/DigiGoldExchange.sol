// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "./interfaces/KlayOracleInterface.sol";

// import "hardhat/console.sol";

contract DigiGoldExchange is
    Initializable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable
{
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public minimumExchange;
    address public feeRecipient;
    mapping(uint256 => uint256) public mintFees;
    mapping(uint256 => uint256) public burnFees;

    address public klayUsdOracleAddress;
    address public goldUsdOracleAddress;

    uint256 public klayUsdPrice;
    uint256 public goldUsdPrice;

    address public dGoldTokenAddress;

    event KlayUsdPriceUpdated(uint256 price);
    event GoldUsdPriceUpdated(uint256 price);

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address upgrader,
        uint256 _minimumExchange,
        address _klayUsdOracleAddress,
        address _goldUsdOracleAddress,
        address _dGoldTokenAddress,
        address _feeRecipient
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);

        minimumExchange = _minimumExchange;
        klayUsdOracleAddress = _klayUsdOracleAddress;
        goldUsdOracleAddress = _goldUsdOracleAddress;
        dGoldTokenAddress = _dGoldTokenAddress;
        feeRecipient = _feeRecipient;

        mintFees[500] = 200; // $500 below : Fee 2% => 200
        mintFees[2000] = 150;
        mintFees[10000] = 100;
        mintFees[10000] = 50;
        mintFees[500000] = 40;
        mintFees[1000000] = 35;
    }

    /**
     * @dev This is used to force update of latest prices from the oracle.
     */
    function fectchLatestPrices() public {
        KlayOracleInterface klayUsdOracle = KlayOracleInterface(
            klayUsdOracleAddress
        );

        klayUsdOracle.newOracleRequest(
            this.updateKlayUsdPrice.selector,
            address(this)
        );

        KlayOracleInterface goldUsdOracle = KlayOracleInterface(
            goldUsdOracleAddress
        );

        goldUsdOracle.newOracleRequest(
            this.updateGoldUsdPrice.selector,
            address(this)
        );
    }

    function updateMinimumExchange(
        uint256 _minimumExchange
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        minimumExchange = _minimumExchange;
    }

    //@dev called by the oracle contract
    function updateKlayUsdPrice(uint256 _price) external {
        require(msg.sender == klayUsdOracleAddress, "Invalid caller");
        klayUsdPrice = _price;

        emit KlayUsdPriceUpdated(_price);
    }

    //@dev called by the oracle contract
    function updateGoldUsdPrice(uint256 _price) external {
        require(msg.sender == goldUsdOracleAddress, "Invalid caller");
        goldUsdPrice = _price;

        emit GoldUsdPriceUpdated(_price);
    }

    function updateGoldUsdOracleAddress(
        address _oracleAddress
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_oracleAddress != address(0), "Invalid oracle");
        goldUsdOracleAddress = _oracleAddress;
    }

    function updateKlayUsdOracleAddress(
        address _oracleAddress
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(_oracleAddress != address(0), "Invalid oracle");
        klayUsdOracleAddress = _oracleAddress;
    }

    function updateMintFees(
        uint256[] memory keys,
        uint256[] memory values
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(keys.length == values.length, "Invalid input");

        for (uint256 i = 0; i < keys.length; i++) {
            mintFees[keys[i]] = values[i];
        }
    }

    function _exchangeUSDCforDGOLD(
        uint256 amount
    ) internal nonReentrant returns (bool) {
        (, uint256 goldOut, uint256 feeOut) = calculateGoldOutAndFee(amount);

        IERC20(dGoldTokenAddress).transfer(msg.sender, goldOut);

        IERC20(dGoldTokenAddress).transfer(feeRecipient, feeOut);

        return true;
    }

    function calculateGoldOutAndFee(
        uint256 _amountIn
    )
        public
        view
        returns (uint256 goldOutBeforeFee, uint256 goldOut, uint256 feeOut)
    {
        uint256 amountOfGold = _calculateGoldAmount(_amountIn);
        uint256 mintingFee = calculateMintFees(_amountIn);

        (bool overflowFlag, uint256 goldBalAfterFee) = Math.trySub(
            amountOfGold,
            mintingFee
        );

        if (overflowFlag) {
            return (amountOfGold, goldBalAfterFee, mintingFee);
        } else {
            revert("GoldOut: Overflow error");
        }
    }

    function _calculateGoldAmount(
        uint256 klayAmount
    ) internal view returns (uint256) {
        uint256 amountOfGold = Math.mulDiv(
            klayAmount,
            klayUsdPrice * 1 gwei,
            goldUsdPrice * 1 gwei,
            Math.Rounding.Floor
        );

        return amountOfGold;
    }

    function calculateMintFees(
        uint256 klayAmount
    ) public view returns (uint256) {
        (bool overflowFlag, uint256 amountInUsd) = Math.tryMul(
            klayAmount,
            klayUsdPrice * 1 gwei
        );

        if (overflowFlag == false) {
            revert("MintFees: Overflow error");
        }

        uint256 amountOfGold = _calculateGoldAmount(klayAmount);

        uint256 fee = 0;

        amountInUsd = amountInUsd / 1e18; //Return back to base 1e18

        if (amountInUsd < 500 ether) {
            fee = mintFees[500];
        } else if (amountInUsd < 2000 ether) {
            fee = mintFees[2000];
        } else if (amountInUsd < 10000 ether) {
            fee = mintFees[10000 ether];
        } else if (amountInUsd < 50000 ether) {
            fee = mintFees[50000];
        } else if (amountInUsd < 1000000 ether) {
            fee = mintFees[1000000];
        } else {
            fee = mintFees[1000000];
        }

        return Math.mulDiv(amountOfGold, fee, 10000, Math.Rounding.Floor);
    }

    function withdrawKlayBalance(
        uint256 amount,
        address payable to
    ) public onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
        require(amount > 0, "Invalid amount");
        require(to.send(amount), "Not enough balance");
    }

    function withdrawERC20Token(
        address tokenAdress,
        uint256 amount,
        address to
    ) public onlyRole(DEFAULT_ADMIN_ROLE) nonReentrant {
        require(amount > 0, "Invalid amount");
        IERC20(tokenAdress).transfer(to, amount);
    }

    // This function is an override required by Solidity.
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(UPGRADER_ROLE) {} // solhint-disable-line no-empty-blocks

    /**
     * @dev Fallback function allowing to perform swap from $KLAY to $DGOLD.
     * Try not to exceed gas available ...
     */
    // solhint-disable no-complex-fallback
    fallback() external payable {
        require(msg.value >= minimumExchange, "Invalid amount");
        _exchangeUSDCforDGOLD(msg.value);
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks
}

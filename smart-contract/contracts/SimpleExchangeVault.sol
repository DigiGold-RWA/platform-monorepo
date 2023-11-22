// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/utils/ReentrancyGuardUpgradeable.sol";
import "@openzeppelin/contracts/utils/math/Math.sol";

import "./interfaces/KlayOracleInterface.sol";

contract SimpleExchangeVault is
    Initializable,
    AccessControlUpgradeable,
    ReentrancyGuardUpgradeable,
    UUPSUpgradeable
{
    using Math for uint256;

    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public minimumExchange;

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
        address _dGoldTokenAddress
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);

        minimumExchange = _minimumExchange;
        klayUsdOracleAddress = _klayUsdOracleAddress;
        goldUsdOracleAddress = _goldUsdOracleAddress;
        dGoldTokenAddress = _dGoldTokenAddress;
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

    function updateKlayUsdPrice(uint256 _price) public {
        klayUsdPrice = _price;

        emit KlayUsdPriceUpdated(_price);
    }

    function updateGoldUsdPrice(uint256 _price) public {
        goldUsdPrice = _price;

        emit GoldUsdPriceUpdated(_price);
    }

    function _exchangeUSDCforDGOLD(
        uint256 amount
    ) internal nonReentrant returns (bool) {
        require(amount > minimumExchange, "Invalid amount");

        uint256 goldAmount = _calculateGoldAmount(amount);

        IERC20(dGoldTokenAddress).transfer(msg.sender, goldAmount);

        return true;
    }

    function _calculateGoldAmount(
        uint256 klayAmount
    ) internal view returns (uint256) {
        (bool overflowR,uint256 goldAmount) = klayAmount.tryMul(klayUsdPrice);
        
        // (klayUsdPrice).div(goldUsdPrice);

        return goldAmount;
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
     */
    // solhint-disable no-complex-fallback
    fallback() external payable {
        require(msg.value > minimumExchange, "Invalid amount");
        _exchangeUSDCforDGOLD(msg.value);
    }

    receive() external payable {} // solhint-disable-line no-empty-blocks
}

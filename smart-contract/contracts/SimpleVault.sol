// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "./interfaces/KlayOracleInterface.sol";

contract SimpleVault is
    Initializable,
    AccessControlUpgradeable,
    UUPSUpgradeable
{
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    uint256 public minimumExchange;

    address public klayUsdOracleAddress;
    address public goldUsdOracleAddress;

    uint256 public klayUsdPrice;
    uint256 public goldUsdPrice;

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
        address _goldUsdOracleAddress
    ) public initializer {
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(UPGRADER_ROLE, upgrader);

        minimumExchange = _minimumExchange;
        klayUsdOracleAddress = _klayUsdOracleAddress;
        goldUsdOracleAddress = _goldUsdOracleAddress;
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
    ) internal view returns (bool) {
        require(amount > minimumExchange, "Invalid amount");

        return true;
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

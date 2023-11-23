// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC20/extensions/ERC20PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/UUPSUpgradeable.sol";
import "./WithBlockedList.sol";

/*

   Copyright DigiGold.finance 2023

   Author Oluwafemi Alofe

   Licensed under the Apache License, Version 2.0
   http://www.apache.org/licenses/LICENSE-2.0

*/

/// @custom:security-contact engineering@digigold.finance
contract DigiGold is
    Initializable,
    ERC20Upgradeable,
    ERC20BurnableUpgradeable,
    ERC20PausableUpgradeable,
    AccessControlUpgradeable,
    UUPSUpgradeable,
    WithBlockedList
{
    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");
    bytes32 public constant UPGRADER_ROLE = keccak256("UPGRADER_ROLE");

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize(
        address defaultAdmin,
        address pauser,
        address minter,
        address upgrader
    ) public initializer {
        __ERC20_init("DigiGold", "DGOLD");
        __ERC20Burnable_init();
        __ERC20Pausable_init();
        __AccessControl_init();
        __UUPSUpgradeable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
        _grantRole(PAUSER_ROLE, pauser);
        _mint(msg.sender, 1562 * 10 ** decimals()); //1g ~ $64, Premint $100,000 ~ 1562g
        _grantRole(MINTER_ROLE, minter);
        _grantRole(UPGRADER_ROLE, upgrader);
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function transfer(
        address _recipient,
        uint256 _amount
    ) public virtual override onlyNotBlocked returns (bool) {
        require(_recipient != address(this), "ERC20: transfer to the contract");
        return super.transfer(_recipient, _amount);
    }

    function transferFrom(
        address _sender,
        address _recipient,
        uint256 _amount
    ) public virtual override onlyNotBlocked returns (bool) {
        require(_recipient != address(this), "ERC20: transfer to contract");
        require(!isBlocked[_sender], "Sender is blocked");
        return super.transferFrom(_sender, _recipient, _amount);
    }

    function burn(uint256 value) public override onlyNotBlocked {
        _burn(_msgSender(), value);
    }

    function mint(address to, uint256 amount) public onlyRole(MINTER_ROLE) {
        _mint(to, amount);
    }

    function burnFromUser(
        address _user,
        uint256 value
    ) public onlyRole(MINTER_ROLE) {
        require(_user != address(this), "Invalid operation");
        require(_user != address(0), "Invalid operation");
        require(value > 0, "Invalid operation");

        _burn(_user, value);
    }

    // This function is an override required by Solidity.
    function _authorizeUpgrade(
        address newImplementation
    ) internal override onlyRole(UPGRADER_ROLE) {} // solhint-disable-line no-empty-blocks

    // This function is an override required by Solidity.
    function _update(
        address from,
        address to,
        uint256 value
    ) internal override(ERC20Upgradeable, ERC20PausableUpgradeable) {
        super._update(from, to, value);
    }

    function addToBlockedList(
        address _user
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _addToBlockedList(_user);
    }

    function removeFromBlockedList(
        address _user
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _removeFromBlockedList(_user);
    }

    function destroyBlockedFunds(
        address _blockedUser
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(isBlocked[_blockedUser], "User is not blocked");
        uint blockedFunds = balanceOf(_blockedUser);
        _burn(_blockedUser, blockedFunds);

        emit DestroyedBlockedFunds(_blockedUser, blockedFunds);
    }

    event DestroyedBlockedFunds(address indexed _blockedUser, uint _balance);
}

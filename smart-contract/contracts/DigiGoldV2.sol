// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "./DigiGold.sol";

contract DigiGoldV2 is DigiGold {
    function isVersionV2() public pure returns (bool) {
        return true;
    }
}

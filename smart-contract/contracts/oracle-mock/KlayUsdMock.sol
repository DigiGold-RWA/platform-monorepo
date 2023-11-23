// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.20;

import "../interfaces/KlayOracleInterface.sol";

contract KlayUsdOracleMock {
    bytes32 public price;

    constructor(bytes32 _price) {
        price = _price;
    }

    //Called by the consumer contract
    function newOracleRequest(
        bytes4 callbackFunctionId,
        address callBackContract
    ) external returns (bool) {
        (bool success, ) = callBackContract.call( // solhint-disable-line avoid-low-level-calls
            abi.encodePacked(callbackFunctionId, price)
        );

        return success;
    }
}

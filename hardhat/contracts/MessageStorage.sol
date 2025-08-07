// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GroupChat {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }

    Message[] public messages;

    function postMessage(string memory _content) public {
        messages.push(Message(msg.sender, _content, block.timestamp));
    }

    function getAllMessages() public view returns (Message[] memory) {
        return messages;
    }

    function getMessageCount() public view returns (uint256) {
        return messages.length;
    }
}

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GroupChat {
    struct Message {
        address sender;
        string text;
        uint timestamp;
    }

    mapping(string => Message[]) public groupMessages;

    function sendMessage(string memory group, string memory text) public {
        groupMessages[group].push(Message(msg.sender, text, block.timestamp));
    }

    function getMessages(string memory group) public view returns (Message[] memory) {
        return groupMessages[group];
    }
}

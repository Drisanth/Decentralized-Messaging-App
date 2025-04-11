// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ChatContract {
    struct Message {
        address sender;
        string content;
        uint256 timestamp;
        uint256 expiry;
    }

    mapping(bytes32 => Message[]) public groupMessages;
    mapping(bytes32 => address[]) public groupMembers;

    address public admin;
    mapping(bytes32 => mapping(address => bool)) public isModerator;

    // Events
    event MessageSent(
        address indexed sender,
        bytes32 indexed groupId,
        string content,
        uint256 timestamp,
        uint256 expiry
    );
    event ModeratorAdded(bytes32 indexed groupId, address indexed mod, address addedBy, uint256 timestamp);
    event ModeratorRemoved(bytes32 indexed groupId, address indexed mod, address removedBy, uint256 timestamp);
    event UserJoinedGroup(bytes32 indexed groupId, address indexed user, uint256 timestamp);
    event ContractDeployed(address indexed admin, uint256 timestamp);

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin");
        _;
    }

    constructor() {
        admin = msg.sender;
        emit ContractDeployed(admin, block.timestamp);
    }

    function sendMessage(bytes32 groupId, string memory content, uint256 expiry) external {
        require(bytes(content).length > 0, "Message cannot be empty");

        if (!isMember(groupId, msg.sender)) {
            groupMembers[groupId].push(msg.sender);
            emit UserJoinedGroup(groupId, msg.sender, block.timestamp);
        }

        groupMessages[groupId].push(
            Message({
                sender: msg.sender,
                content: content,
                timestamp: block.timestamp,
                expiry: expiry
            })
        );

        emit MessageSent(msg.sender, groupId, content, block.timestamp, expiry);
    }

    function getMessages(bytes32 groupId) external view returns (Message[] memory) {
        return groupMessages[groupId];
    }

    function isMember(bytes32 groupId, address user) internal view returns (bool) {
        for (uint i = 0; i < groupMembers[groupId].length; i++) {
            if (groupMembers[groupId][i] == user) return true;
        }
        return false;
    }

    // === Admin & Moderator Functions ===

    function addModerator(bytes32 groupId, address mod) external onlyAdmin {
        isModerator[groupId][mod] = true;
        emit ModeratorAdded(groupId, mod, msg.sender, block.timestamp);
    }

    function removeModerator(bytes32 groupId, address mod) external onlyAdmin {
        isModerator[groupId][mod] = false;
        emit ModeratorRemoved(groupId, mod, msg.sender, block.timestamp);
    }

    function checkModerator(bytes32 groupId, address mod) external view returns (bool) {
        return isModerator[groupId][mod];
    }
}

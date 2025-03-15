// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract GroupChat {
    struct Message {
        address sender;
        string ipfsHash; // Stores the message on IPFS
        uint256 timestamp;
    }

    struct ChatRoom {
        string name;
        address owner;
        address[] members;
        Message[] messages;
    }

    mapping(uint256 => ChatRoom) public chatRooms;
    uint256 public roomCount;

    function createRoom(string memory _name) public {
        chatRooms[roomCount].name = _name;
        chatRooms[roomCount].owner = msg.sender;
        chatRooms[roomCount].members.push(msg.sender);
        roomCount++;
    }

    function joinRoom(uint256 _roomId) public {
        chatRooms[_roomId].members.push(msg.sender);
    }

    function sendMessage(uint256 _roomId, string memory _ipfsHash) public {
        require(isMember(_roomId, msg.sender), "Not a member");
        chatRooms[_roomId].messages.push(Message(msg.sender, _ipfsHash, block.timestamp));
    }

    function getMessages(uint256 _roomId) public view returns (Message[] memory) {
        return chatRooms[_roomId].messages;
    }

    function isMember(uint256 _roomId, address _user) private view returns (bool) {
        for (uint256 i = 0; i < chatRooms[_roomId].members.length; i++) {
            if (chatRooms[_roomId].members[i] == _user) {
                return true;
            }
        }
        return false;
    }
}

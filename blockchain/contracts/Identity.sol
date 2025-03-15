// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Identity {
    struct User {
        string username;
        address userAddress;
    }
    mapping(address => User) public users;

    function register(string memory _username) public {
        require(users[msg.sender].userAddress == address(0), "User already exists");
        users[msg.sender] = User(_username, msg.sender);
    }
}

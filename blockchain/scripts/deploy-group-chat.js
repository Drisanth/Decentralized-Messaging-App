const hre = require("hardhat");

async function main() {
    const GroupChat = await hre.ethers.getContractFactory("GroupChat");
    const groupChat = await GroupChat.deploy();
    await groupChat.deployed();
    console.log("GroupChat contract deployed to:", groupChat.address);
}

main().catch(error => {
    console.error(error);
    process.exitCode = 1;
});

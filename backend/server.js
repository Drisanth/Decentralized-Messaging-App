import express from 'express';
import { ethers } from 'ethers';
import { uploadToIPFS, getFromIPFS } from './ipfs.js';

const app = express();
app.use(express.json());

const provider = new ethers.providers.JsonRpcProvider("http://localhost:8545");
const signer = provider.getSigner();
const groupChatABI = [
    "function createRoom(string memory _name) public",
    "function joinRoom(uint256 _roomId) public",
    "function sendMessage(uint256 _roomId, string memory _ipfsHash) public",
    "function getMessages(uint256 _roomId) public view returns (tuple(address sender, string ipfsHash, uint256 timestamp)[])"
];
const groupChatContract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", groupChatABI, signer);

app.post('/create-room', async (req, res) => {
    const tx = await groupChatContract.createRoom(req.body.name);
    await tx.wait();
    res.json({ success: true });
});

app.post('/join-room', async (req, res) => {
    const tx = await groupChatContract.joinRoom(req.body.roomId);
    await tx.wait();
    res.json({ success: true });
});

app.post('/send-message', async (req, res) => {
    const ipfsHash = await uploadToIPFS(req.body.message);
    const tx = await groupChatContract.sendMessage(req.body.roomId, ipfsHash);
    await tx.wait();
    res.json({ ipfsHash });
});

app.get('/get-messages/:roomId', async (req, res) => {
    const messages = await groupChatContract.getMessages(req.params.roomId);
    const parsedMessages = await Promise.all(messages.map(async msg => ({
        sender: msg.sender,
        message: await getFromIPFS(msg.ipfsHash),
        timestamp: new Date(msg.timestamp * 1000).toLocaleString()
    })));
    res.json(parsedMessages);
});

app.listen(3000, () => console.log('Server running on port 3000'));

const express = require('express');
const app = express();
const Web3 = require('web3');
const contractJSON = require('./build/contracts/ChatContract.sol/ChatContract.json');
const contractABI = contractJSON.abi;
const contractAddress = 'YOUR_DEPLOYED_CONTRACT_ADDRESS'; // Replace with actual deployed address

// Connect to local Ethereum node (Hardhat)
const web3 = new Web3('http://localhost:8545'); // or http://127.0.0.1:7545

// Initialize contract
const contract = new web3.eth.Contract(contractABI, contractAddress);

app.use(express.json());

// POST: Send a message
app.post('/send-message', async (req, res) => {
  const { groupId, content, expiry } = req.body;

  try {
    const accounts = await web3.eth.getAccounts();

    await contract.methods
      .sendMessage(web3.utils.keccak256(groupId), content, expiry)
      .send({ from: accounts[0] }); // or use req.body.sender

    res.send({ status: 'Message sent successfully' });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// GET: Retrieve messages for a group
app.get('/get-messages/:groupId', async (req, res) => {
  const { groupId } = req.params;

  try {
    const messages = await contract.methods
      .getMessages(web3.utils.keccak256(groupId))
      .call();

    res.send(messages);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

// Optional: Fetch all accounts (for frontend testing)
app.get('/accounts', async (req, res) => {
  const accounts = await web3.eth.getAccounts();
  res.send(accounts);
});

app.listen(3000, () => {
  console.log('🌐 Server running on http://localhost:3000');
});

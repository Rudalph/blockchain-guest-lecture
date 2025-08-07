const express = require("express");
const cors = require("cors");
const { Web3 } = require('web3');
const app = express();
app.use(cors());
app.use(express.json());

const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
const ABI = [
    {
      "inputs": [],
      "name": "getAllMessages",
      "outputs": [
        {
          "components": [
            {
              "internalType": "address",
              "name": "sender",
              "type": "address"
            },
            {
              "internalType": "string",
              "name": "content",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "timestamp",
              "type": "uint256"
            }
          ],
          "internalType": "struct GroupChat.Message[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "getMessageCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "messages",
      "outputs": [
        {
          "internalType": "address",
          "name": "sender",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "content",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "timestamp",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_content",
          "type": "string"
        }
      ],
      "name": "postMessage",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ];

const web3 = new Web3("http://127.0.0.1:8545/");

let contract;
let account;
web3.eth.getAccounts().then((accounts) => {
  account = accounts[0];
  contract = new web3.eth.Contract(ABI, CONTRACT_ADDRESS);
});

app.post("/post", async (req, res) => {
  const { message } = req.body;
  try {
    await contract.methods.postMessage(message).send({ from: account });
    res.json({ success: true, msg: "Message posted!" });
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.get("/messages", async (req, res) => {
  try {
    const count = await contract.methods.getMessageCount().call();
    const messages = [];

    for (let i = 0; i < count; i++) {
      const msg = await contract.methods.messages(i).call();

      messages.push({
        sender: msg.sender,
        content: msg.content,
        timestamp: Number(msg.timestamp)  
      });
    }

    res.json(messages);
  } catch (e) {
    res.status(500).json({ success: false, error: e.message });
  }
});

app.listen(3001, () => {
  console.log("Server running on http://localhost:3001");
});

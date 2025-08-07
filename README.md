# 🚀 Quick Start Guide: Web3 dApp with Hardhat, Node.js, and Frontend

This guide helps you get your local blockchain dApp project up and running quickly.

---

## 🧹 Note 1: Clear Hardhat Cache First

Before running the project, make sure to **delete the `cache/` folder** inside the Hardhat project directory to avoid stale contract data.

```bash
rm -rf cache
```

---

## ⚙️ Commands to Run Hardhat (Smart Contract Layer)

1. **Start Local Ethereum Node**  
   ```bash
   npx hardhat node
   ```  
   _(Generates 20 test accounts with ETH)_

2. **Deploy the Contracts**  
   ```bash
   npx hardhat run scripts/deploy.js --network localhost
   ```  
   _(Returns deployed smart contract address)_

---

## 📌 Note 2: Update Backend

Paste the deployed contract address in the backend code (or wherever needed). Ensure the ABI and address are correctly linked.

---

## 🖥️ Start Backend

```bash
node server.js
```

---

## 🌐 Start Frontend

```bash
simplehttpserver frontend
```

_(Serves frontend on http://localhost:8000)_

---
const hre = require("hardhat");

async function main() {
  const GroupChat = await hre.ethers.getContractFactory("GroupChat");
  const contract = await GroupChat.deploy();
  await contract.waitForDeployment();
  console.log("Contract deployed to:", await contract.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});

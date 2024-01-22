import { ethers } from "hardhat";

async function main() {

  // Deploying the contract
  const simpleStorage = await ethers.deployContract('SimpleStorage')

  await simpleStorage.waitForDeployment();

  console.log("Registration contract deployed to:", simpleStorage.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
import { ethers } from "hardhat";

async function main() {

  // Deploying the contract
  const simpleStorage = await ethers.deployContract('SimpleStorage')

  await simpleStorage.waitForDeployment();

  console.log("Registration contract deployed to:", simpleStorage.target);

  await simpleStorage.set(5);
  const value = await simpleStorage.get();
  console.log(`geting the value from contract ${value}`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
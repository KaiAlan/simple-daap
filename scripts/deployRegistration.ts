import { ethers } from "hardhat";

async function main() {

  // Deploying the contract
  const registration = await ethers.deployContract('Registration')

  await registration.waitForDeployment();

  console.log("Registration contract deployed to:", registration.target);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
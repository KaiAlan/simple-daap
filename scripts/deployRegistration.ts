import { ethers } from "hardhat";

async function main() {

  // Deploying the contract
  const registration = await ethers.deployContract('Registration')

  await registration.waitForDeployment();

  console.log("Registration contract deployed to:", registration.target);

  await registration.addFarmer("itsme","banana");

  const value = await registration.addresstofarmer('0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266');

  console.log(value);

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
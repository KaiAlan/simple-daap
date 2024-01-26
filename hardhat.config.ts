import { HardhatUserConfig } from "hardhat/config";
import '@nomicfoundation/hardhat-toolbox';

const config: HardhatUserConfig = {
  defaultNetwork:"Ganache",
  networks:{
    hardhat:{},
    Ganache:{
      url:"http://127.0.0.1:7545"
    }
  },
  solidity: "0.8.19",
};

export default config;
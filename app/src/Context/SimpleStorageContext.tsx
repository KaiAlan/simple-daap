import React, { useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";

import { ContractAbi, ContractAddress } from "../constants/contractConstants";

export type SimpleStorageContextType = {
  connectWallet: () => void;
  storeData: (data: number) => Promise<void>;
  getData: () => Promise<any>;
  currentAccount: string | undefined;
  balance: string | undefined;
  chainId: number | undefined;
  chainname: string | undefined;
  data: string | undefined;
};

export const SimpleStorageContext =
  React.createContext<SimpleStorageContextType | null>(null);
declare var window: any;

const getEthereumContract = async () => {
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
  const simpleStorageContract = new ethers.Contract(
    ContractAddress,
    ContractAbi,
    signer
  );

  return simpleStorageContract;
};

export const SimpleStorageProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [balance, setBalance] = useState<string | undefined>();
  const [currentAccount, setCurrentAccount] = useState<string | undefined>();
  const [chainId, setChainId] = useState<number | undefined>();
  const [chainname, setChainName] = useState<string | undefined>();
  const [data, setData ] = useState<string | undefined>();

  useEffect(() => {
    if (!currentAccount || !ethers.isAddress(currentAccount)) return;
    //client side code
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    provider.getBalance(currentAccount).then((result) => {
      setBalance(ethers.formatEther(result));
    });
    provider.getNetwork().then((result) => {
      setChainId(ethers.toNumber(result.chainId));
      setChainName(result.name);
    });
  }, [currentAccount]);

  const connectWallet = async () => {
    try {
      if (!window.ethereum) {
        console.log("please install MetaMask");
        return;
      }

      //we can do it using ethers.js
      const provider = new ethers.BrowserProvider(window.ethereum);

      // MetaMask requires requesting permission to connect users accounts
      provider
        .send("eth_requestAccounts", [])
        .then((accounts) => {
          if (accounts.length > 0) setCurrentAccount(accounts[0]);
        })
        .catch((e) => console.log(e));
    } catch (error) {
      console.log(error);

      throw new Error("No ethereum object");
    }
  };

  const storeData = async(data: number) => {

    try {
      if(!window.ethereum){
        console.log("Please Install Metamask");
        return
      }
  
      const simpleStorageContract = await getEthereumContract();
  
      await simpleStorageContract.set(data).then((res) => console.log(res));
  
      console.log("data stored");
    } catch (error) {
      console.log(error);
    }
  }
  const getData = async() => {

    try {
      if(!window.ethereum){
        console.log("Please Install Metamask");
        return
      }
  
      const simpleStorageContract = await getEthereumContract();
      const data1 = (await simpleStorageContract.get()) ?? 'oopsi';
      const data2 = data1.toString();
      setData(data2);
      console.log(data2)
      
    } catch (error) {
      console.log(error)
    }
  }

  // const checkIfWalletIsConnected = async () => {
  //   try {
  //     if (!window.ethereum) return alert("Please Install Metamask");

  //     const accounts = await window.ethereum.request({
  //       method: "eth_accounts",
  //     });

  //     if (accounts.length) {
  //       setCurrentAccount(accounts[0]);
  //     } else {
  //       console.log("No Account Found");
  //     }
  //   } catch (error) {
  //     console.log(error);

  //     throw new Error("No ethereum object");
  //   }
  //   // console.log(accounts);
  // };

  // useEffect(() => {
  //   setData(data);
  // }, [data]);

  return (
    <SimpleStorageContext.Provider
      value={{ connectWallet, storeData, getData, currentAccount, balance, chainId, chainname, data }}
    >
      {children}
    </SimpleStorageContext.Provider>
  );
};

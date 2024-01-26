import React, { useState, useEffect, ReactNode } from "react";
import { ethers } from "ethers";

import { ContractAbi, ContractAddress } from "../constants/contractConstants";

export type RegistrationContextType = {
    connectWallet: () => void;
    registerFarmer: (name:string, crop:string) => Promise<void>;
    getFarmerDetails: () => Promise<void>;
    currentAccount: string | undefined;
    balance: string | undefined;
    chainId: number | undefined;
    chainname: string | undefined;
    data: string | undefined;
};

export const RegistrationContext =
    React.createContext<RegistrationContextType | null>(null);

declare var window: any;
const getEthereumContract = async () => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const RegistrationContract = new ethers.Contract(
        ContractAddress,
        ContractAbi,
        signer
    );

    return RegistrationContract;
};

export const RegistrationProvider: React.FC<{ children: ReactNode }> = ({ children, }) => {
    const [balance, setBalance] = useState<string | undefined>();
    const [currentAccount, setCurrentAccount] = useState<string | undefined>();
    const [chainId, setChainId] = useState<number | undefined>();
    const [chainname, setChainName] = useState<string | undefined>();
    const [data, setData] = useState<string | undefined>();

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

    const registerFarmer = async(name:string, crop:string) => {
        try {
            if(!window.ethereum){
              console.log("Please Install Metamask");
              return
            }
        
            const RegistrationContract = await getEthereumContract();
        
            await RegistrationContract.addFarmer(name, crop).then((res) => console.log(res));
        
            console.log("farmer registerd");
          } catch (error) {
            console.log(error);
          }
    }

    const getFarmerDetails = async() => {
        try {
            if(!window.ethereum){
              console.log("Please Install Metamask");
              return
            }
        
            const RegistrationContract = await getEthereumContract();
        
            const value = await RegistrationContract.addresstofarmer(currentAccount).then((res) => console.log(res));
        
            console.log(value);
          } catch (error) {
            console.log(error);
          }
    }


    return (
    <RegistrationContext.Provider
     value={{ connectWallet,registerFarmer, getFarmerDetails, currentAccount, balance, chainId, chainname, data }}>
        {children}
    </RegistrationContext.Provider>
);
};
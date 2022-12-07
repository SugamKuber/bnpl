import React, { useEffect } from "react";
import Navbar from "./Navbar";
import { useState, useContext, createContext } from "react";
import { Contract, ethers } from "ethers";
import { solpayAddress, abi } from "../constants/index"
import HDWalletProvider from "@truffle/hdwallet-provider";
import { OpenSeaPort, Network } from 'opensea-js'
export const solpayContext = createContext();
export default function Layout({ children }) {
    const [modal, setModal] = useState(false)
    const [details, setDetails] = useState(null)
    const [home, setHome] = useState(true);
    const [connected, setConnected] = useState(false);
    const [provider, setProvider] = useState(null);
    const [contract, setContract] = useState(null);
    const [seaport, setSeaport] = useState(null);
    const [account, setAccount] = useState(null);
    const [url, setUrl] = useState("");
    const [repayments, setRepayments] = useState({ "instalments_left": 0 });

    const networks = {
        mumbai: {
            chainId: `0x${Number(80001).toString(16)}`,
            chainName: "Mumbai Testnet",
            nativeCurrency: {
                name: "MATIC",
                symbol: "MATIC",
                decimals: 18
            },
            rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
            blockExplorerUrls: ["https://mumbai.polygonscan.com/"]
        }
    }
    const connectWallet = async () => {
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            console.log(signer);
            if (await signer.getChainId() != 80001) {
                await window.ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [
                        {
                            ...networks["mumbai"]
                        }
                    ]
                })
            }
            setProvider(signer);
            setAccount(await signer.getAddress())
            const contract = new Contract(solpayAddress, abi, signer)
            setContract(contract);
            setRepayments(await contract.users(await signer.getAddress()));
            setConnected(true);

        }
        catch (err) {
            alert(err.message);
        }
    }
    const disconnect = async () => {
        setConnected(false);
        setProvider(null);
        setContract(null);
        setAccount(null);
    }

    const changeHome = () => {
        setHome(!home);
    }

    const getDetails = async (url) => {
        const tokenDetails = url.split("/");
        const tokenId = tokenDetails[tokenDetails.length - 1];
        const tokenAddress = tokenDetails[tokenDetails.length - 2];
        setDetails(await seaport.api.getAsset({
            tokenAddress,
            tokenId
        }))
        setModal(true)
    }
    const accountAddress = process.env.NEXT_PUBLIC_OWNER_ADDRESS;
    const PRIVATE_KEY = process.env.NEXT_PUBLIC_PRIVATE_KEY;
    const providerUrl = process.env.NEXT_PUBLIC_ALCHEMY_URL;
    useEffect(() => {

        let walletProvider = new HDWalletProvider({
            privateKeys: [
                PRIVATE_KEY
            ],
            providerOrUrl: providerUrl
        });


        setSeaport(new OpenSeaPort(walletProvider, {
            networkName: 'goerli',
            apiKey: ""
        },))

    }, [])



    return (
        <solpayContext.Provider value={{
            changeHome,
            connectWallet,
            disconnect,
            connected,
            setHome,
            home,
            contract,
            provider,
            account,
            seaport,
            modal,
            getDetails,
            details,
            setModal,
            url,
            setUrl,
            repayments
        }}>
            <Navbar home={home} />
            {children}
        </solpayContext.Provider>
    )
}


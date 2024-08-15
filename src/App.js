import "mdb-react-ui-kit/dist/css/mdb.min.css";
import { MDBContainer, MDBRow, MDBCol } from "mdb-react-ui-kit";

import React, { useEffect, useState } from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
} from "mdb-react-ui-kit";

import { ethers } from "ethers";


const avalancheChainId = "0xa86a"; // Avalanche Mainnet Chain ID

export const ABI = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "allowance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "balance",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "needed",
        type: "uint256",
      },
    ],
    name: "ERC20InsufficientBalance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "approver",
        type: "address",
      },
    ],
    name: "ERC20InvalidApprover",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "ERC20InvalidReceiver",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "sender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSender",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "ERC20InvalidSpender",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "burnFrom",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
];


export function Wallet({ address, signer, provider }) {
  const [balance, setBalance] = useState(null)
  const [tokenContract, setTokenContract] = useState(null);
  const orangeTokenAddress = "0x6c14c1898C843FF66cA51e87244690bBc28DF215";
  const recipient = "0xd8f2A6755ca52Aae034aF50b041E892646F9a8f3"; //goama main wallet token address 

  useEffect(() => {
    async function checkBalance(address) {
      const contract = new ethers.Contract(orangeTokenAddress, ABI, signer);
      setTokenContract(contract);
      const name = await contract.name();
      const symbol = await contract.symbol();
      const orangeBalance = await contract.balanceOf(address)
      setBalance(orangeBalance.toString())
    }
    checkBalance(address);
  }, []);

  const transferTokens = async () => {
    console.log("Initiated.");
    console.log(provider);
    const amount = 10;
    const decimals = 18; // Assuming the token has 18 decimals
    const amountInWei = ethers.parseUnits(amount.toString(), 'ether');

    try {
      // Check allowance
      console.log(tokenContract)
      const allowance = await tokenContract.allowance(address, recipient);
      console.log(`Allowance: ${allowance.toString()}`);
      

      // Check balance
      const balance = await tokenContract.balanceOf(address);
      console.log(`Balance: ${balance.toString()}`);

      if (balance > amountInWei) {
        // Approve the token transfer
        const approvalTx = await tokenContract.approve(recipient, amountInWei);
        await approvalTx.wait();
        console.log(`Approved ${amount} tokens to ${recipient}`);
      }

      // Transfer the tokens
      const tx = await tokenContract.transfer(recipient, amountInWei, {
        gasLimit: 100000, // Increase gas limit
      });
      console.log(`Transaction hash: ${tx.hash}`);
      await tx.wait();
      console.log(`Transferred ${amount} tokens to ${recipient}`);
    } catch (error) {
      console.error("Error transferring tokens", error);
    }
  };

  // 0x7ac8db11a6ae1769c9b88ccad633a6d7c598a267f23bdcfa31b45b08c441e39a

  return (
    <MDBRow center className="mx-auto">
      <MDBCard>
        <MDBCardBody>
          <MDBCardTitle>Card title</MDBCardTitle>
          <MDBCardText>Total Balance {address} #balance {balance}</MDBCardText>
          <MDBBtn onClick={transferTokens}>Pay 10 Orange</MDBBtn>
        </MDBCardBody>
      </MDBCard>
    </MDBRow>
  );
}

function App() {
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [address, setAddress] = useState(null);
  const [tokenContract, setTokenContract] = useState(null);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const chainId = "43114n";
  const avalancheChainId = 43114;
  const avalancheRpcUrl = "https://api.avax.network/ext/bc/C/rpc";

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const network = await provider.getNetwork();
        console.log(network.provider)
        await network.request
        await provider.send("eth_requestAccounts", []);
        // await provider.send("eth_sendTransaction")
        const signer = await provider.getSigner();


        setProvider(provider);
        setSigner(signer);
        setAddress(signer.address);
      } catch (error) {
        console.error("Error connecting to MetaMask", error);
      }
    } else {
      alert("Please install MetaMask");
    }
  };

  return (
    <MDBContainer>
      {!address && (
        <div className="d-flex align-items-center justify-content-center">
          <MDBBtn onClick={connectWallet}>Connect Wallet {address}</MDBBtn>
        </div>
      )}
      {address && (
        <Wallet address={address} signer={signer} provider={provider} />
      )}
    </MDBContainer>
  );
}



export default App;
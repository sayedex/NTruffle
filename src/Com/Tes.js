import React,{useEffect,useState} from "react"
import Web3 from 'web3'
import BigNumber from "bignumber.js";
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'
//test
import WalletConnectProvider from "@walletconnect/web3-provider";

//token logo
import tokenlogo from "./img/favicon.png"
import lock from "./img/lock.png"
//staking abi
import staking from "./staking.json"
import TRDC from "./Devtoken.json"
import Web3Modal from "web3modal";

//0x8e80131810Bb92479AFcf801b20Bbe9fD97A4229
const Test = ()=>{
//this is for walllet
//  Create WalletConnect Provide
const provider = new WalletConnectProvider({
  rpc: {
    56: "https://bsc-dataseed.binance.org/",
    // ...
  },
  chainId:56,
  infuraId:"d46dbd68f6df489cb73f9f2613eb8ccf",
  qrcodeModalOptions: {
    mobileLinks: [
      "rainbow",
      "metamask",
      "argent",
      "trust",
      "imtoken",
      "pillar",
    ],
  },
});

const Sayed = async()=>{
  await provider.enable();
  const web3 = new Web3(provider);
  const accounts = await web3.eth.getAccounts();
console.log(accounts);
const StakingContract = new web3.eth.Contract(staking.abi,"0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab");
console.log(StakingContract);
const Totalstaked = await StakingContract.methods.Totalstakes("0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab").call();
console.log(Totalstaked);
const TRDcContract = new web3.eth.Contract(TRDC.abi,"0x7e8db69dcff9209e486a100e611b0af300c3374e");

const result = await TRDcContract.methods.approve("0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab",1000).send({from:"0x77Af6CEc25172d78c9464f0C6C09920F446F70Be"})
await provider.disconnect()

}
const hasan = async()=>{
  
}
const Sayed1= async()=>{
  const web3 = new Web3(window.ethereum);
  await window.ethereum.enable()
  const accounts = await web3.eth.getAccounts();
console.log(accounts);
const StakingContract = new web3.eth.Contract(staking.abi,"0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab");
console.log(StakingContract);
const Totalstaked = await StakingContract.methods.Totalstakes(accounts[0]).call();
console.log(Totalstaked);
}


return (
<botton onClick={Sayed}>Sayed</botton>
)

}
export default Test;
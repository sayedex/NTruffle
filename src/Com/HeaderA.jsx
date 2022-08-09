import React,{useEffect,useState} from "react"
import Web3 from 'web3'
import BigNumber from "bignumber.js";
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'
//token logo
import tokenlogo from "./img/favicon.png"
import lock from "./img/lock.png"
//staking abi
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import TestAA from "./OnlyTest"
const Header = (props)=>{

return (<>
<div className="main_header">

<div className="logo">
    <img src={tokenlogo} alt="TRDC"/>
    <h3>TRDC</h3>
</div>

<div className="Blockchian_btn">
    {/* <div className="web3_btn" > */}
      <botton className="web3_btn">
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
<p>{props.wallet}</p>
</botton>
{/* </div> */}
</div>
</div></>)



}
export default Header;
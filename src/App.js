import './App.css';
import {
  BrowserRouter as Router,
  Link
} from "react-router-dom";
import { Switch, Route } from "react-router-dom";
import Test from "./Com/Tes"
import React,{useEffect,useState} from "react"
import BigNumber from "bignumber.js";
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import Web3 from 'web3'
import PoolsA from "./Com/POOL/PoolsA"
import tokenlogo from "./Com/img/favicon.png"
//header 
import Header from "./Com/HeaderA"
import TestAA from "./Com/Pools2"
import Popup from "./Com/Popup/Popup"
function App() {



  let web3Modal;

  const providerOptions = {
		walletconnect: {
		  package: WalletConnectProvider, // required
		  options: {
			rpc: {
			  56: 'https://bsc-dataseed.binance.org/',
			  97:'https://data-seed-prebsc-1-s1.binance.org:8545/'
			},
			network: 'binance',
			chainId: 56,
		  },
	  
		},
	  };
	 
	

	  if (typeof window !== 'undefined'){
	  web3Modal = new Web3Modal({
		network: "binance", // optional
		// cacheProvider: true, // optional
		providerOptions ,// required,
		disableInjectedProvider: false,
	  });
	  }  
	const newTry = async()=>{
		try{
		 const provider1 = await web3Modal.connect();
		  await provider1.enable();
		  setprovider(provider1);
		  setconnet(true);
		  console.log("login");
		//   setwholesite(1);
		//   LoadAlldeta();
		  }catch{
			return;
			console.log("not connet");
		  }
		//   provider.on('accountsChanged', handleAccountsChanged)
		//   provider.on('disconnect', handleDisconnect)
		// console.log("yes");
	  }


















return (
<>
<TestAA />
</>

)

}

export default App;

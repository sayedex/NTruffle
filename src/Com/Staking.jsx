import React,{useEffect,useState} from "react"
import { Web3ReactProvider } from '@web3-react/core'
import { useWeb3React } from "@web3-react/core"
import { injected } from "./img/Connnector"
import Web3 from 'web3'
import BigNumber from "bignumber.js";
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'


import Stakingabi from "./Stakingabi.json"
import CakeTokenabi from "./CakeToken.json"
const Staking = ()=>{
const [stakingamout,setstakingamout] = useState();
const [CakeCon,setCakeCon] = useState();
const [Stakingmainpool,setStakingmainpool] = useState();
const [user,ssetuser] = useState();
const [earn,setearn] = useState("..")
const [test,settestt] = useState(false);
const [stakedd,setstakedd] = useState("..");
const [errorMessage, setErrorMessage] = useState("");
const [successMessage, setSuccessMessage] = useState("");
const [loading, setLoading] = useState(false);
const [aprrove,setapproved] = useState("aprrove");
const [stakeover,setstakeover] = useState(false);
const [refr,setrefr] = useState(0);
const re = ()=>{
  setrefr(11);
}
useEffect(() => {
  loadWeb3()   
  loadBlockchainData();

//esl
}, [refr]);



  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable()
    } else {
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
  };
  const loadBlockchainData = async () => {
    // setLoading(true);
    if (
      typeof window.ethereum == "undefined" 
    ) {
      return;
    }
    const web3 = new Web3(window.ethereum);
    let url = window.location.href;
    const StakingContract = new web3.eth.Contract(Stakingabi.abi,"0x0dC913bC7E653005A4fDbD317E7EdF2b7366878B");
    setStakingmainpool(StakingContract);
    const CaketokenCon = new web3.eth.Contract(CakeTokenabi.abi,"0x16c189981660f8bf84c54c12351f0ba342b9ffc0");
    setCakeCon(CaketokenCon);
    const accounts = await web3.eth.getAccounts();
     ssetuser(accounts[0]);



     //reward Earning 
    //  const balanceofuser = await hello.methods.balanceOf(accounts[0]).call();
    const Totalstaked = await StakingContract.methods.Totalstakes(accounts[0]).call();
    const TotalEarnedTOGW = await web3.utils.fromWei(Totalstaked,'ether');
    setstakedd(TotalEarnedTOGW);
    console.log(Totalstaked);
    const balanceofreward = await StakingContract.methods.earned(accounts[0]).call();
    const TotalEarned = await web3.utils.fromWei(balanceofreward,'ether')
    console.log(TotalEarned);
    setearn(TotalEarned)
    // setearn(Totalearning);  //reward Earning  

    // const Tokensalecontact = new web3.eth.Contract(Tokensale.abi,"0x9bD3FfF95ecd4DA1ba93679f87c9DEBc6b5fD534")
    //  let totalsupplyS = await hello.methods.totalSupply().call();
    //  const totalsupply = await web3.utils.fromWei(totalsupplyS,'ether')


        //Token price facthing 

    // if (accounts.length == 0) {
    //   return;
    // }
    // setAccount(accounts[0]);
    // const networkId = await web3.eth.net.getId();
///user balance factching 

// const balanceofuser = await hello.methods.balanceOf(accounts[0]).call();
// const totalsold = await Newtokensale.methods.totalsold().call();
// const Tokenprice = await Tokensalecontact.methods.tokenprice().call();
// const Realtokenprice = await web3.utils.fromWei(Tokenprice,'ether')
// const totalsoldtotal = await web3.utils.fromWei(totalsold,'ether')
// settotalsolda(totalsoldtotal)
// const balanceofuserinwei = await web3.utils.fromWei(balanceofuser,'ether')
// setbalanceofuser(balanceofuserinwei);};
  }



////new 

const change =(e)=>{
    setstakingamout(e.target.value);

};
const approve = async(s)=>{    
  setLoading(true);
  setErrorMessage("");
  setSuccessMessage("");
  s.preventDefault();
  setLoading(true);
  const web3 = new Web3(window.ethereum);
  const Amount = await web3.utils.toWei(stakingamout);

  try{
    const result = await CakeCon.methods.approve("0x0dC913bC7E653005A4fDbD317E7EdF2b7366878B",Amount).
  send({from:user.toString()}).on("transactionHash", (hash) => {
    setapproved("Approved");
    setstakeover(true)
  setSuccessMessage("Hey,You are done!! ");
})}catch{
  setErrorMessage("Opps Try Again Plz!!");
  // setstakeover(false)

}
setLoading(false);
}

const Send = async (e)=>{

    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    const Amount = await web3.utils.toWei(stakingamout);
      e.preventDefault();
     await Stakingmainpool.methods.stake(Amount).send({from:user.toString()}).on("transactionHash",(hash)=>{
     window.alert("sucess");
     re();
      console.log(hash);
    }).on("error", () => {
      window.alert("plz Try Again ")
    });
  
    // setstakingamout("")

};
const withdrawaasa = async (e)=>{
    e.preventDefault();
    const web3 = new Web3(window.ethereum);
    const Amount = await web3.utils.toWei(stakingamout);
   await Stakingmainpool.methods.withdraw(Amount).send({from:user.toString()}).once("recepient", (recepient) => {
    window.alert("WOW! withdraw Done");
    window.location.reload();
   })
   .on("error", () => {
     window.alert("plz Try Again ")
   });;
// await newtokensale.methods.buyTokens(newamountofethinwei).send({from:userdeta.toString() })
//      .once("recepient", (recepient) => {
//       window.alert("sucess");
//       window.location.reload();
//     })
//     .on("error", () => {
//      window.alert("error ")
//      });
  
//   }
}
//new
const Emergencry = async (e)=>{
  e.preventDefault();
 const web3 = new Web3(window.ethereum);
    await Stakingmainpool.methods.getReward().send({from:user.toString()}).once("recepient", (recepient) => {
        window.alert("withdraw Done");
        window.location.reload();
       })
       .on("error", () => {
         window.alert("plz Try Again ")
       })
}
return (
    <>

<form>

<p>Connet with {user}</p>
<h1>Your Reward : {earn}</h1>
<h1>Total Stake : {stakedd}</h1>
<input type="text" onChange={change} value={stakingamout} required/>
<br></br>
<button onClick={approve} disabled={loading} className={stakeover? "hide_" :"show"}>{successMessage ? "Approved!" : (loading ? <CircularProgress size={25} /> : "Approve")}</button><br/>
<button onClick={Send} className={stakeover?"show" :"hide_"}>Stake Now</button><br/>
<p> {successMessage && <Alert severity="success">{successMessage}</Alert>}
    {errorMessage && <Alert severity="error">{errorMessage}</Alert>}</p>
<button onClick={withdrawaasa}>withdraw</button><br/>

<button onClick={Emergencry}>Get Reward</button>
</form>
</>
)




}

export default Staking;










// const web3 = new Web3(window.ethereum);
 
// const amountofethinwei = await web3.utils.toWei(a.toString())


// await presalecontractinstance
// .methods
// .buyTokens()
// .send({from:account , value : amountofethinwei })
//   .once("recepient", (recepient) => {
//    window.alert("sucess")
//   })
//   .on("error", () => {
//     window.alert("error ")
//   })








// CakeCon.methods.approve("0x4311F1bBd707a53823D0a7ed488507694C0A226C",Amount).send({from:user.toString()}).on('transactionHash',(hash)=>{
//   hash?
//    Stakingmainpool.methods.stake(Amount).send({from:user.toString()}).on("transactionHash",(hash)=>{
//     window.alert("sucess");

//   }):
//   window.alert("Failed");
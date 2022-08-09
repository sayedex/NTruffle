import React,{useEffect,useState} from "react"
import Web3 from 'web3'
import BigNumber from "bignumber.js";
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'
//token logo
import tokenlogo from "../img/favicon.png"
import lock from "../img/lock.png"
//staking abi
import staking from "../staking.json"
import TRDC from "../Devtoken.json"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import POOLB from "./POOLB";
//0x8e80131810Bb92479AFcf801b20Bbe9fD97A4229
const TestAA = ()=>{
//this is for walllet

const [isConnected, setIsConnected] = useState();
const [wallet,setwallet] = useState("Connet wallet");
const [autoref,setautoref] = useState(0);
const [currentAccount, setCurrentAccount] = useState(null);
const [userinput,setuserinput] = useState("");
const [stakingabi,setstakibgabi] = useState();
const [trdcabi,settrdcabi] = useState();
const [acc,setacc ] = useState();
const [stakedhow,setstakedhow] = useState(false);
const [loading,setloading] = useState(false);
const [loadingCL,setloadingCL] = useState(false);
const [loadingwithdraw,setloadingwithdraw] = useState(false);
const [loadapprove,setloadapprove] = useState();
const [afterapproved,setafterapproved] = useState("");
const [errroapprove,seterrroapprove] = useState("");
const [rewardsend,setrewardsend] = useState("");
const [TOTALSTAKED,setTOTALSTAKED] = useState("0");
//total user staked for apy
const [totalstaked,settotalstaked] = useState("");
const [AVAILABLE,setAVAILABLE] = useState("--");
const [earn,setearn]  = useState("--");
const [dynamicref,setdynamicref] = useState(0);
const [pageload,setpageload] = useState(false);
const [Apy,setApy] = useState(0);
const [alreadyApproved,setalreadyApproved] = useState(false);
const [stakeload,setstakeload ] = useState(false);
const [wholesite,setwholesite] = useState(0);
let count=1;
useEffect(() => { 
  LoadAlldeta();

}, [dynamicref,wholesite])
const Ref_fun = ()=>{

  if(wallet=="Connet wallet"){
    setwholesite(count++);
  }else{
    setwholesite(0);
  }
}
// i need update the provider when its load on the window.eth chian

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
  
  const providerOptions = {
    walletconnect: {
      package: WalletConnectProvider, // required
      options: {
        rpc: {
          56: 'https://bsc-dataseed.binance.org/',
        },
        network: 'binance',
        chainId: 56,
      },
  
    },
  };
  
  const web3Modal = new Web3Modal({
    network: "binance", // optional
    cacheProvider: true, // optional
    providerOptions ,// required,
    disableInjectedProvider: false,
  });

// start
//loadweb3.js

// window.onload =  ()=>{
// localStorage.clear();
// //  await provider.disconnect()

// }

const LoadAlldeta = async()=>{
  const provider = await web3Modal.connect();
    await provider.enable()
    const web3 = new Web3(provider);
  
//staking abi3sss
// 0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab
//pools

// token
// 0x7e8db69dcff9209e486a100e611b0af300c3374e
const networkId = await web3.eth.net.getId();
if(networkId == 56){
setpageload(true);
const StakingContract = new web3.eth.Contract(staking.abi,"0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab");
setstakibgabi(StakingContract);
//staking abi
//trdc token abi call
const TRDcContract = new web3.eth.Contract(TRDC.abi,"0x7e8db69dcff9209e486a100e611b0af300c3374e");
settrdcabi(TRDcContract);


//trdc token abi call
const accounts = await web3.eth.getAccounts();
setacc(accounts[0]);
const slice = accounts[0].slice(1,5)+"..."+accounts[0].slice(-3);
setwallet(slice)
const Totalstaked = await StakingContract.methods.Totalstakes(accounts[0]).call();
const TotalstakedETH = await web3.utils.fromWei(Totalstaked,'ether');
setTOTALSTAKED(parseInt(TotalstakedETH))
// few things test 
const Permisson = await TRDcContract.methods.allowance(accounts[0],"0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab").call();
if(Permisson==0){
  setalreadyApproved(false)
}else{
  setalreadyApproved(true)
}
// few things test
//how much token user have 
const balance = await TRDcContract.methods.balanceOf(accounts[0]).call();
const balanceETH = await web3.utils.fromWei(balance,'ether');
setAVAILABLE(parseInt(balanceETH))
//how much earned
const balanceofreward = await StakingContract.methods.earned(accounts[0]).call();
const TotalEarned = await web3.utils.fromWei(balanceofreward,'ether');
setearn(parseInt(TotalEarned));

///
//total user staked for apy
const Totalfullstake = await StakingContract.methods.Totalfullstake().call();
const TotalfullstakeETH = await web3.utils.fromWei(Totalfullstake,'ether');
settotalstaked(TotalfullstakeETH);
const finalApy = (4380000/TotalfullstakeETH)*100;
setApy(parseInt(finalApy));

//this if for our apy
//total staked by user

//days

//Totalpool




 setpageload(false);


}else{
  window.alert("Pls! Try it on BSC chian!");
}
//total user staked for apy
}
//this is onchnage fun
const Chnagevalue =(e)=>{
  setuserinput(e.target.value);

}
//this is for approve funtion
const approve = async (d)=>{
  if(wallet=="Connet wallet"){
      setwholesite(count++);
  }
  d.preventDefault();
  setloading(true);
console.log("work");
const solve = 10000000000000;
const Amount = 1000

  try{
    const result = await trdcabi.methods.approve("0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab",Amount).send({from:acc.toString()}).on("transactionHash", (hash) => {
    // setapproved("Approved");
    // setstakeover(true)
  // setSuccessMessage("Hey,You are done!! ");
  setstakedhow(true);
  setafterapproved("Approved! Stake Now!");
  setalreadyApproved(true);
})}catch{ 
  seterrroapprove("Try again!")

}
  // setErrorMessage("Opps Try Again Plz!!");
  // setstakeover(false)
  setloading(false);
}
// Stake token


const Stake = async (d)=>{

  d.preventDefault();
  if(userinput==""){
    window.alert("Type amount!");
    }
    else{
      setstakeload(true);
      const web3 = new Web3(provider);
      const Amount = await web3.utils.toWei(userinput);
  await stakingabi.methods.stake(Amount).send({from:acc.toString()}).on("transactionHash",(hash)=>{
  window.alert("stake Done!");

  }).on("error",()=>{
window.alert("try again")
setstakeload(false);
  }


  )
  setstakeload(false);
}
setdynamicref(1);
}
///withdraw
const withdrawaasa = async (e)=>{
  if(wallet=="Connet wallet"){
    setwholesite(count++);
}
  setstakedhow(true);
  e.preventDefault();
  if(userinput==""){
    window.alert("Type amount!");
    }else{
      setloadingwithdraw(true);
      const web3 = new Web3(provider);
      const Amount = await web3.utils.toWei(userinput);
  await stakingabi.methods.withdraw(Amount).send({from:acc.toString()}).once("recepient", (recepient) => {
  setrewardsend("Send! your reward!");
 }).on("error", () => {
   window.alert("plz Try Again ");
   setloadingwithdraw(false);

 });
// await newtokensale.methods.buyTokens(newamountofethinwei).send({from:userdeta.toString() })
//      .once("recepient", (recepient) => {
//       window.alert("sucess");
//       window.location.reload();
//     })
//     .on("error", () => {
//      window.alert("error ")
//      });

//   }

setloadingwithdraw(false);
setstakedhow(false);
setdynamicref(2);
    }
}
///cliam Reward 


const Emergencry = async (e)=>{
  if(wallet=="Connet wallet"){
  setwholesite(count++);
}
  e.preventDefault();
  setloadingCL(true);
    await stakingabi.methods.getReward().send({from:acc.toString()}).once("recepient", (recepient) => {
        window.alert("withdraw Done");
        window.location.reload();
       })
       .on("error", () => {
         window.alert("plz Try Again ");
         setloadingCL(false);
       })
       setdynamicref(3);
       setloadingCL(false)
}
// Stake token
// console.log(wallet);

// console.log(stakingabi);
// end
return (

<>


<div className="main_header">

<div className="logo">
    <img src={tokenlogo} alt="TRDC"/>
    <h3>TRDC</h3>
</div>

<div className="Blockchian_btn">
    {/* <div className="web3_btn" > */}
      <botton className="web3_btn" onClick={Ref_fun}>
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
<p>{wallet}</p>
</botton>
{/* </div> */}
</div>
</div>
{pageload?<div className="Pageloader"><CircularProgress size={40}/></div> :
<div className="mainapp">
<form>
<div className="staking_main">
<div className="mystake">
<h2>TRDC-STAKING</h2>
<h2 className="APY">{Apy}% <span className="small">APR</span></h2>
</div>

<div className="totaltoken">

<div className="totalZStaked">
<h3>TOTAL STAKED</h3>
<p>{TOTALSTAKED} <span className="small">TRDC</span></p>

</div>
<div className="Howmuchuhave">
<h3>AVAILABLE
</h3>
<p>{AVAILABLE} <span className="small">TRDC</span></p>

</div>
</div>
<div className="input_pair">
<input type="text" value={userinput} onChange={Chnagevalue} placeholder="Amount"></input>
<div className="pair"><img className="token_logo" src={tokenlogo}></img>
<h3>TRDC</h3>
</div>
</div>
<div className="cliam">
<div className="Reward_token">
  <h3>CLIAMABLE REWARDS
</h3>
<p>{earn} TRDC</p>
</div>
<button className="Get" onClick={Emergencry} disabled={loadingCL}>{loadingCL?<CircularProgress size={25}/>:"Claim"}</button>
</div>

{/* //dynamic deta */}

<div >
{/* { afterapproved && <Alert  severity="success">{afterapproved}</Alert>} */}
{rewardsend && <Alert  severity="success">{rewardsend}</Alert>}
</div>
{/* //dynamic deta */}
<div className="stake" id="sa">
 
{/* {successMessage ? "Approved!" : (loading ? <CircularProgress size={25} /> : "Approve")} */}

<button  className="test_" disabled={loading} onClick={approve} id={alreadyApproved? 'hide' :"aa"} type="submit" >
  {loading?<CircularProgress size={25}/>:"Enable"}
  {/* <span>Approve</span>
  <div class="wave"></div> */}
</button>
<button href="#" disabled={loading} className="test_" onClick={Stake} id={alreadyApproved? 'show' :"hide"}>
{loading?"Enabling..":"     "}
{stakeload?<CircularProgress size={25}/>:"Stake"}
</button>

</div>
<div className="Unstake">

<button onClick={withdrawaasa}>
 {loadingwithdraw?<CircularProgress size={25}/>:"UnStake"}

</button>

</div>


</div>
{/* <POOLB/> */}
</form>







</div>

}






</>


)













}
export default TestAA;

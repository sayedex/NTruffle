import React,{useEffect,useState} from "react"
import Web3 from 'web3'
import BigNumber from "bignumber.js";
import { Typography, Button, TextField, Grid, CircularProgress, Alert } from '@mui/material'
//token logo
import tokenlogo from "./img/favicon.png"
import lock from "./img/lock.png"
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close';

//staking abi
import staking from "./staking.json"
import TRDC from "./Devtoken.json"
import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal, { Provider } from "web3modal";
import Popup from "./Popup/Popup"
import StakePOPup from "./Popup/StakePo"
import StakenotDone from "./Popup/StakeNotdone"
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
const [stakeload,setstakeload ] = useState(false);
const [wholesite,setwholesite] = useState(0);
//popup
const [popup,setpoup] = useState(false);
// when user done the stake
const [Stakedonepopup,setStakedonepopup] = useState(false);
// if stake not done
//all popup
const [open, setOpen] = useState(false);
const [openfordone, setopenfordone] = useState(false);
//
// const [done,setDone]=useState(false);
const [Stakenotdone,setStakenotdone] = useState(false);
const [alreadyApproved,setalreadyApproved] = useState(false);
const [PopupText,setPopupText] = useState("");
const [PopupTextfordone,setPopupTextfordone] = useState("");


let count=1;
const Ref_fun = ()=>{
  if(wallet=="Connet wallet"){
    setwholesite(count++);
    console.log("click");
  }else{
    setwholesite(0);
  }
}
useEffect(() => { 
  LoadAlldeta();
  setloading(false);
}, [dynamicref,wholesite])

// i need update the provider when its load on the window.eth chian

// const provider = new WalletConnectProvider({
//     rpc: {
//       56: "https://bsc-dataseed.binance.org/",
//       // ...
//     },
//     chainId:56,
//     infuraId:"d46dbd68f6df489cb73f9f2613eb8ccf",
//     qrcodeModalOptions: {
//       mobileLinks: [
//         "rainbow",
//         "metamask",
//         "argent",
//         "trust",
//         "imtoken",
//         "pillar",
//       ],
//     },
//   });
  
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
  let web3Modal;
  let web1;
  if (typeof window !== 'undefined'){
  web3Modal = new Web3Modal({
    network: "binance", // optional
    cacheProvider: true, // optional
    providerOptions ,// required,
    disableInjectedProvider: false,
  });
  }

// start
//loadweb3.js

// window.onload =  ()=>{
// localStorage.clear();
// //  await provider.disconnect()

// }
const handleAccountsChanged = ()=>{
  setdynamicref(count++);
}
const handleDisconnect = ()=>{
  setdynamicref(count++);
}
let provider;
const LoadAlldeta = async()=>{
  try{
  provider = await web3Modal.connect();
  await provider.enable();
  }catch{
    return;
  }
  const web3 = new Web3(provider);
  provider.on('accountsChanged', handleAccountsChanged)
  provider.on('disconnect', handleDisconnect)

  if (provider?.on) {
    console.log("sas");
  }

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
 const PermissonE= await web3.utils.fromWei(Permisson,'ether');
 console.log(PermissonE);
   if(PermissonE==0){
  setalreadyApproved(false);
 }
 else if(PermissonE==10000000000000){
   setalreadyApproved(false);
  }else{
  setalreadyApproved(true);
 }
const Triggerit =()=>{
  setalreadyApproved(false);
  console.log("call!");
}
 setInterval(() => {
 Triggerit();
 }, 345600000);

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
return () => {
  if (provider.removeListener) {
    provider.removeListener('accountsChanged', handleAccountsChanged)
    provider.removeListener('disconnect', handleDisconnect)
  }
}

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
  // const provider = await web3Modal.on();
  // await provider.enable();
  const web3 = new Web3(provider);
const solve = "115792089237316195423570985008687907853269984";
const Amount = await web3.utils.toWei(solve);

  try{
    const result = await trdcabi.methods.approve("0xa5A48d169B87E1775658e66B3FF8C5A11e4549ab",Amount.toString()).send({from:acc.toString()}).on("transactionHash", (hash) => {
  setstakedhow(true);
  setafterapproved("Approved! Stake Now!");
  setalreadyApproved(true);
})}catch{ 
  seterrroapprove("Try again!");
  setloading(false);

}
  
  setloading(false);
}
// Stake token

const Stake = async (d)=>{
  d.preventDefault();
  if(userinput==""){
    setPopupText("Type Amount To Stake!");
    setOpen(true);
    }
    else if(AVAILABLE<=0){
      setpoup(true);
    }
    else{
      setstakeload(true);
      // const provider = await web3Modal.on();
  // await provider.enable();
  const web3 = new Web3(provider);
      const Amount = await web3.utils.toWei(userinput);
  await stakingabi.methods.stake(Amount).send({from:acc.toString()}).on("transactionHash",(hash)=>{
  setStakedonepopup(true);

  }).on("error",()=>{
    setStakenotdone(true);
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
    setPopupText("Type Amount To Unstake!");
    setOpen(true);
  
    }else if(TOTALSTAKED<userinput){
   setPopupText("You don't Stake Any amount! You Can Stake Now");
   setOpen(true);
 
    } 
    else{
      setloadingwithdraw(true);
      // const provider = await web3Modal.on();
      const web3 = new Web3(provider);
      const Amount = await web3.utils.toWei(userinput);
  await stakingabi.methods.withdraw(Amount).send({from:acc.toString()}).on("transactionHash", (hash) => {
  setPopupTextfordone("Unstake request submitted it will done in 20s!");
  setopenfordone(true);
 }).on("error", () => {
  setPopupText("Make sure you have enough BNB fees! Try Again");
  setOpen(true)
   setloadingwithdraw(false);

 });


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
  if(earn >0){
  setloadingCL(true);
    await stakingabi.methods.getReward().send({from:acc.toString()}).on("transactionHash", (hash) => {
      PopupTextfordone("Congratulation! your Reward send!");
      setopenfordone(true);

        window.location.reload();
       })
       .on("error", () => {
        setPopupText("Cliam Failed! Try again");
        setOpen(true);
         setloadingCL(false);
       })
       setdynamicref(3);
       setloadingCL(false)}else{
        setPopupText("Sorry! You Don't have enough reward! try it after 24h!");
        setOpen(true);

        // setpoup(true);
       }
}
return (

<>
{/* //staling popup */}
<Popup name="TRDC" Link="" show="show_popup" popup={popup} setpoup={()=>setpoup(false)}/>
<StakePOPup name="TRDC" Link="" show="show_popup" popup={Stakedonepopup} setStakedonepopup={()=>setStakedonepopup(false)}/>

<StakenotDone name="Stake Failed!" Link="" show="show_popup" popup={Stakenotdone} setStakenotdone={()=>setStakenotdone(false)}/>
<div className="POPUP">

{  <Collapse in={open}>
        <Alert
severity="error"
        variant="filled" 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
{PopupText}
        </Alert>
      </Collapse>
        
        }


{  <Collapse in={openfordone}>
        <Alert
severity="success"
        variant="filled" 
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setopenfordone(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
{PopupTextfordone}

        </Alert>
      </Collapse>
        
        }

</div>
<div className="main_header">

<div className="logo">
    <img src={tokenlogo} alt="TRDC"/>
    <h3>TRDC</h3>
</div>

<div className="Blockchian_btn">

      <botton className="web3_btn" onClick={Ref_fun}>
<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24"><path d="M0 0h24v24H0z" fill="none"/><path d="M21 18v1c0 1.1-.9 2-2 2H5c-1.11 0-2-.9-2-2V5c0-1.1.89-2 2-2h14c1.1 0 2 .9 2 2v1h-9c-1.11 0-2 .9-2 2v8c0 1.1.89 2 2 2h9zm-9-2h10V8H12v8zm4-2.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"/></svg>
<p>{wallet}</p>
</botton>

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

<div >
{/* { afterapproved && <Alert  severity="success">{afterapproved}</Alert>} */}
{/* {rewardsend && <Alert  severity="success">{rewardsend}</Alert>} */}
</div>
{/* //dynamic deta */}
<div className="stake" id="sa">
{/* {successMessage ? "Approved!" : (loading ? <CircularProgress size={25} /> : "Approve")} */}
<button  className="test_" disabled={loading} onClick={approve}  type="submit" id={alreadyApproved? "hide" : "show"}>
  {loading?<CircularProgress size={22}  />:"Enable"}

</button>
<button href="#" disabled={loading} className="test_" onClick={Stake} id={alreadyApproved? 'show' :"hide"}>
{loading?"Enabling..":"     "}
{stakeload?<CircularProgress size={22} />:"Stake"}
</button>

</div>
<div className="Unstake">

<button onClick={withdrawaasa}>
 {loadingwithdraw?<CircularProgress size={25}/>:"UnStake"}

</button>

</div>


</div>
</form>







</div>

}






</>


)













}
export default TestAA;

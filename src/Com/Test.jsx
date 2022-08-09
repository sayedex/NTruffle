import React,{useEffect,useState} from "react"
import { Web3ReactProvider } from '@web3-react/core'
import { useWeb3React } from "@web3-react/core"
import { injected } from "./img/Connnector"
import Abi from "./Abi.json"
import Web3 from 'web3'
import Devtoken from "./Devtoken.json"
import Tokensale from "./Tokensale.json"
import Tokensaletow from "./New.json"
import newtoken from "./Newtoken.json"
const TestWeb3 = ()=>{
  const [value,setvalue] = useState();
  const [newinput,setnewinput] = useState()
  const [store,sestore] = useState()
  const [totalsupply,settotalsupply] = useState()
  const [tokencontract,settokencontact] =useState()
  const [newtoken1,setnewtoken] =useState()
  const [userdeta,setuserdeta] = useState("")
  const [balanceofuser,setbalanceofuser] = useState();
  const [Devtokensale,setDevtokensale] = useState()
  const [newtokensale,setnewtokensale] = useState()
  const [tokenprice,settokenprice] = useState();
  const [totalsolda,settotalsolda] = useState();
  const [loding ,loging] = useState();
  const [show,setshow] = useState(true);
  const [show2,setshow2] = useState(false);
  const [approve,setapprove] = useState(false);
  

   const change = (e)=>{
    setvalue(e.target.value);
  }

  const loadWeb3 = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
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
  
    const accounts = await web3.eth.getAccounts();
    setuserdeta(accounts)
    const hello = new web3.eth.Contract(Devtoken.abi,"0x4B9C6e95F3F80319303dEfdb8ae8Bf888b0b544F");
    const Tokensalecontact = new web3.eth.Contract(Tokensale.abi,"0x9bD3FfF95ecd4DA1ba93679f87c9DEBc6b5fD534")
    const Newtokensale = new web3.eth.Contract(Tokensaletow.abi,"0x5B1c9b77B0af4bEE44f0f8C240dAc75497ec08A1")
    setnewtokensale(Newtokensale);
    const Newtokem = new web3.eth.Contract(newtoken.abi,"0xed24fc36d5ee211ea25a80239fb8c4cfd80f12ee")
    setnewtoken(Newtokem);
    settokencontact(hello)
    setDevtokensale(Tokensalecontact);
     let totalsupplyS = await hello.methods.totalSupply().call();
     const totalsupply = await web3.utils.fromWei(totalsupplyS,'ether')
     settotalsupply(totalsupply)



        //Token price facthing 

    // if (accounts.length == 0) {
    //   return;
    // }
    // setAccount(accounts[0]);
    // const networkId = await web3.eth.net.getId();
///user balance factching 

const balanceofuser = await hello.methods.balanceOf(accounts[0]).call();
const totalsold = await Newtokensale.methods.totalsold().call();
const Tokenprice = await Tokensalecontact.methods.tokenprice().call();
const Realtokenprice = await web3.utils.fromWei(Tokenprice,'ether')
const totalsoldtotal = await web3.utils.fromWei(totalsold,'ether')
settotalsolda(totalsoldtotal)
const balanceofuserinwei = await web3.utils.fromWei(balanceofuser,'ether')
setbalanceofuser(balanceofuserinwei);};

  const handlechnage = ()=>{

    // tokencontract.methods.approve("0xe76899F7E3400e276fA8ec99d03C9F0421dE2d9d", 100000).send({ from: userdeta.toString()})
  }
  useEffect(() => {
    loadWeb3();
    loadBlockchainData();

    //esl
  }, []);
  const changeininputfield = (e)=>{
    console.log(e.target.value)
    setvalue(e.target.value);
  }
  const newchnage = (e)=>{
    console.log(e.target.value)
    setnewinput(e.target.value.toString());
  }
const SendTrsnsation = async (e)=>{
e.preventDefault();    const web3 = new Web3(window.ethereum);
const amountofethinwei = await web3.utils.toWei(value.toString());
try{

  tokencontract.methods.approve("0x52fDFBE36aC1B6F743fbdDcFbe585c5e5950b687", amountofethinwei).send({ from: userdeta.toString()}).once
  ("recepient",(recepient)=>{
    setapprove(true);
  }).on("error",(error)=>{
    window.alert("error ")

  })

}catch(e){
  window.alert("error")
      return;
}
await Devtokensale.methods.buyTokens()  .send({from:userdeta.toString() , value : amountofethinwei })
   .once("recepient", (recepient) => {
   alert("sucess")
  })
  .on("error", () => {
   window.alert("error ")
   });

}
////new 



const SendTrsnsationTow = async (e)=>{
  e.preventDefault();    
  const web3 = new Web3(window.ethereum);
  const newamountofethinwei = await web3.utils.toWei(newinput);
     newtoken1.methods.approve("0x5B1c9b77B0af4bEE44f0f8C240dAc75497ec08A1", newamountofethinwei).send({ from: userdeta.toString()}).on("transactionHash",(hash)=>{
      console.log(hash);
    hash?
    newtokensale.methods.buyTokens(newamountofethinwei).send({from:userdeta.toString()}).on("transactionHash",(hash)=>{
      window.alert("sucess");
      setapprove(true)
    }):
    
    window.alert("Failed");

  })

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
const Pairchange =(e)=>{
console.log("work");
setshow2(false)
setshow(true)

}
const Pairchange1 =(e)=>{
  console.log("work");
  setshow(false);
  setshow2(true);

  
  }
return (
    <>
<h1>Total supply {totalsupply} Dev Token</h1>
<h1>You have {balanceofuser} Dev token man!</h1>
<h1>Total Sold {totalsolda} % </h1>
{/* <h1>Token Price : {tokenprice} ETH</h1> */}


<div className="selector">
<div  onClick={Pairchange}> BNB/DEV</div>
<div className="BNBDEV" onClick={Pairchange1}> BUSD/DEV</div>
</div>

<form onSubmit={SendTrsnsation}  className={show? "BNBDAI" : "hide"}>

<input type=""  value={value} onChange={changeininputfield} required/><br/>
<button type="submit">Buy Now*bnb</button>


</form >
<form className={show2? "BNBDAI" : "hide"} onSubmit={SendTrsnsationTow}>
<input type="" value={newinput} onChange={newchnage} required/>
<br></br>
<button>"Buy Now* BUSD/DEV</button>
<h1>{approve? "Buy Done" : "Apporve pls!"}</h1>
</form>

    </>
)




}

export default TestWeb3;










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
//   });
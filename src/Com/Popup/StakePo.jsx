import React,{useState} from "react"
import ClearIcon from '@mui/icons-material/Clear';
import "./Popup.css"
import {IconButton} from "@material-ui/core"
const StakePOPup  = (props)=>{
// const {name,Discription,Link} =
 
return (
<>
<div className="Popup"  id={props.popup? 'showpopup':"hidepopup"}>
<div className="pop_Main">

<div className="popup-header">
<h2>{props.name}  </h2>
<IconButton> <ClearIcon onClick={props.setStakedonepopup}></ClearIcon></IconButton>
</div>
<div className="content">
<h3>Congratulation!!!</h3>
<p>
 You Earning is Started now ! Buy more {props.name} token to Stake your amount,Click Buy botton to buy!
</p>
</div>
<div className="Btn_">
<button className="Buy_token">Buy {props.name}</button>
<br/>
<button className="Close_" onClick={props.setStakedonepopup} >Close Window</button>
</div>
</div>

</div>



</>



)


}
export default StakePOPup;
import React,{useState} from "react"
import ClearIcon from '@mui/icons-material/Clear';
import "./Popup.css"
import {IconButton} from "@material-ui/core"
const Popup  = (props)=>{
const [show,setshow] = useState(false);
// const {name,Discription,Link} =
const Close = ()=>{
 
}
return (
  
<>
<div className="Popup"  id={props.popup? 'showpopup':"hidepopup"}>
<div className="pop_Main">

<div className="popup-header">
<h2>{props.name} required</h2>
<IconButton> <ClearIcon onClick={props.setpoup}></ClearIcon></IconButton>
</div>
<div className="content">
<h3>Insufficient {props.name} balance</h3>
<p>
 Buy some {props.name} to Stake your amount,Click Buy botton to buy!
</p>
</div>
<div className="Btn_">
<button className="Buy_token">Buy {props.name}</button>
<br/>
<button className="Close_" onClick={props.setpoup} >Close Window</button>
</div>
</div>

</div>



</>



)






}
export default Popup;
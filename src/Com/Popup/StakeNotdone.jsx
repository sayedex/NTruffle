import React,{useState} from "react"
import ClearIcon from '@mui/icons-material/Clear';
import "./Popup.css"
import {IconButton} from "@material-ui/core"
const StakenotDone  = (props)=>{
// const {name,Discription,Link} =
 
return (
<>
<div className="Popup"  id={props.popup? 'showpopup':"hidepopup"}>
<div className="pop_Main">

<div className="popup-header">
<h2>{props.name}  </h2>
<IconButton> <ClearIcon onClick={props.setStakenotdone}></ClearIcon></IconButton>
</div>
<div className="content">
<h3>Try again!</h3>
<p>
Please Make sure you have enought BNB fees! or Try to increase gas fees!
</p>
</div>
<div className="Btn_ BN" >
<br/>
<button className="Close_" onClick={props.setStakenotdone} >Close Window</button>
</div>
</div>

</div>



</>



)


}
export default StakenotDone;
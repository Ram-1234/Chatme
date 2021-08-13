import React from 'react'
import './group.css';
import {useHistory} from 'react-router-dom'

let user="Ram"

function Group(props) {
    const history=useHistory();
     //console.log(history)
    const clickEvent=(e)=>{
        //let groupname=document.getElementsByClassName("groupname")
        //console.log(e.target.textContent)
        user=e.target.textContent;
         history.push('chat')
    }
    return (
            <div  className="chatGroup">
                <i class="fas fa-user-circle"></i>
                    <div className="groupdivName">
                        <h5  onClick={clickEvent} className="groupname">{props.group.length >16 ? props.group.slice(0,18)+"..." : props.group}</h5>
                        <div className="lastgroupMsg">{props.lastmsg}</div>
                    </div> 
                <span className="lastmsgTime">{props.lastmsgtime}</span>
            </div>
    )
}

export default Group
export {user}

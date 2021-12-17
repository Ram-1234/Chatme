import React from 'react'
import './user.css';
import {useHistory} from 'react-router-dom'

let user='';
let name='';
function User(props) {
    const history=useHistory();

    const clickEvent=(e)=>{
       //console.log(props.userid);
        //console.log(e.target.textContent);
        user=props.userid;
        name=props.username;
        //console.log(user);
        //console.log(props.userid, props.username);
        history.push('/chat');
    }

    return (
            <div  className="chatGroup" onClick={clickEvent}>
                <i class="fas fa-user-circle"></i>
                    <div className="groupdivName" >
                        <h5   className="groupname">{props.username.length >16 ? props.username.slice(0,18)+"..." : props.username}</h5>
                        <div className="lastgroupMsg">{props.lastmsg}</div>
                    </div> 
                <span className="lastmsgTime">{props.lastmsgtime}</span>
            </div>
    )
}

export default User
export {user}
export {name}

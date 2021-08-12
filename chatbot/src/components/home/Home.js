import React from 'react'
import './home.css'
import Data from '../data/Data'
import Groups from '../group/Group';
import ReactScrollToBottom from "react-scroll-to-bottom"

 const  Home=()=> {
     
    return (
        <div className="homePage">
            <div  className="homeContainer">
                <div className="headerContents">
                   <span className="edit">Edit</span>
                   <span className="chats">Chats</span>
                   <span><i className="far fa-edit"></i></span>
                   </div>
                   <ReactScrollToBottom className="groupBox">
                    {
                     Data.chats.map((item)=> <Groups 
                     user={Data.user}
                     key={item.topic}
                     lastmsg={item.messages[item.messages.length-1].message} 
                     lastmsgtime={
                             parseInt(item.messages[item.messages.length-1].time.slice(11,17).replace(".",":").substr(0, 2))>12? 
                             (item.messages[item.messages.length-1].time.slice(11,17).replace(".",":").substr(0, 2) % 12+":"+item.messages[item.messages.length-1].time.slice(14,16).replace(".",":") +" PM"):
                             (item.messages[item.messages.length-1].time.slice(11,17).replace(".",":").substr(0, 2)+":"+item.messages[item.messages.length-1].time.slice(14,16).replace(".",":")+" AM")    
                            }
                     group={item.topic}
                     />)  
                    }
                   </ReactScrollToBottom>
                    <div className="chatInfo">
                    <i className="fas fa-circle-notch"></i>
                    <i className="fas fa-phone-alt"></i>
                    <i className="fas fa-camera"></i>
                    <i className="fas fa-comments"></i>
                    <i className="fas fa-cog"></i>
                </div>   
            </div> 
        </div>
    )
}

export default Home
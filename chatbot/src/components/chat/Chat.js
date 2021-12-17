import React,{useState,useEffect} from 'react';
import './chat.css';
import Message from '../message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom";
import {useHistory} from 'react-router-dom';
import {user} from '../users/user';
import {name} from '../users/user';
import Header from '../../home/header/header';
import { CometChat } from '@cometchat-pro/chat';




function Chat() {
     var [message,setMessage]=useState("");
     const [messages,setMessages]=useState([]);
     const history=useHistory();

    console.log(messages)
     const backHome=()=>{
         history.push('/chathome');
     }

     useEffect(()=>{
        let UID = user;
        let messagesRequest = new CometChat.MessagesRequestBuilder()
												.setUID(UID)
												.setLimit(50)
												.build();
       messagesRequest.fetchPrevious().then((d)=>setMessages(d)) ;                            
     },[message])

     const sendMsg=evt=>{ 
      if(evt.key==="Enter"){
        let receiverID = user;
        let messageText =`${message}`;
        let receiverType = CometChat.RECEIVER_TYPE.USER;
        let textMessage = new CometChat.TextMessage(receiverID, messageText, receiverType);

        CometChat.sendMessage(textMessage).then(
        message => {
            console.log("Message sent successfully:", message);
            setMessage('');
        }, error => {
            console.log("Message sending failed with error:", error);
        }
        );
      }
  }
 
   

    
    return (
        <>
        <Header/>
         <div className="homePage">
            <div  className="homeContainer">
                <div className="addContact">
                    <p className="userInfo">
                        <i onClick={backHome} className="fas fa-chevron-left"></i>
                        {/* <span className="numberUser">1</span> */}
                        <span className="groupLogo"><i className="fas fa-users"></i></span>
                        <span className="groupName">{name.slice(0,8)+".."}</span>
                    </p>
                    <i className="fas fa-user-plus"></i>
                </div>
                <ReactScrollToBottom className="chatBox">
                     {
                         messages.map((item)=> <Message 
                         classes={item.receiver.uid===user ? "right" : "left"}
                         text={item.data.text}
                        />)  
                     }
                </ReactScrollToBottom> 
                <div className="sendMessageInfo">
                    <span className="messageFiled">
                            <input type="text" 
                                placeholder="Type a message" 
                                //onClick={search}
                                onKeyPress={sendMsg}
                                onChange={e=>setMessage(e.target.value)}
                                value={message}
                                id="inputMessage"
                            />
                        <i className="fas fa-folder-plus"></i>
                    </span>
                    <span>
                        <i className="fas fa-camera"></i>
                        <i className="fas fa-microphone"></i>
                    </span>
                </div>   
            </div> 
        </div>
        </>
    )
}

export default Chat;

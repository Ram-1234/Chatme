import React,{useEffect,useState} from 'react'
import socketIO from 'socket.io-client'
import './chat.css';
import Message from '../message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import {useHistory} from 'react-router-dom';
import {user} from '../group/Group';



const ENDPOINT="http://localhost:4500/";
function Chat() {
     const [numberuser]=useState(13);
    // var [message,setMsg]=useState("")
     const [id,setid]=useState("")
     const [messages,setMessage]=useState([])
     const history=useHistory();


     console.log(messages)
     const backHome=()=>{
         history.replace('','http://localhost:3000/chat')
     }
    
     const sendMsg=evt=>{
         const socket=socketIO(ENDPOINT,{transports:['websocket']});
      if(evt.key==="Enter"){
            const   message=document.getElementById('inputMessage').value;
                socket.emit(`message`,{message,id})
                
            if(message.length>0){
              setMessage([...messages,{user:'Ram',message:`${message}`,classs:'left'}])
              document.getElementById('inputMessage').value=""
          }
      }
  }
 
   

    useEffect(()=>{
        const socket=socketIO(ENDPOINT,{transports:['websocket']});
        socket.on('connect',()=>{
       setid(socket.id)
    })
    ///console.log(socket)
    socket.emit('joined',{user})

    socket.on('welcome',(data)=>{
           setMessage([...messages,data])
            //console.log(data.user,data.message)
        })
    socket.on('userJoinde',(data)=>{
       setMessage([...messages,data])
        //console.log(data.user,data.message);
    })
    socket.on('leave',(data)=>{
        //console.log(data.user, data.message)
    })
    return ()=>{
        //socket.emit('disconnect');
        socket.off()
    }
    },[])

    useEffect(()=>{
         const socket=socketIO(ENDPOINT,{transports:['websocket']});
        socket.on('sendMessage',(data)=>{
            setMessage([...messages,data])
            //console.log(data.user,data.message,data.id)
        })
        return()=>{
         socket.off()
        }
    }, [])

    return (
         <div className="homePage">
            <div  className="homeContainer">
                <div className="addContact">
                    <p className="userInfo">
                        <i onClick={backHome} className="fas fa-chevron-left"></i>
                        <span className="numberUser">{numberuser}</span>
                        <span className="groupLogo"><i className="fas fa-users"></i></span>
                        <span className="groupName">{user.slice(0,14)+".."}</span>
                    </p>
                    <i className="fas fa-user-plus"></i>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item)=> <Message   user={item.id===id? 'Ram':item.user} message={item.message} classs={item.id===id? 'right':'left'}/>)}
                </ReactScrollToBottom> 
                <div className="sendMessageInfo">
                    <span className="messageFiled">
                        <i className="fas fa-plus"> </i>  
                            <input type="text" 
                                placeholder="Type a message" 
                                //onClick={search}
                                onKeyPress={sendMsg}
                                //onChange={e=>setMsg(e.target.value)}
                                //value={message}
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
    )
}

export default Chat

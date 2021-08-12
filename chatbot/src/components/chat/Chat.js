import React,{useEffect,useState} from 'react'
import socketIO from 'socket.io-client'
import './chat.css';
import Message from '../message/Message'
import ReactScrollToBottom from "react-scroll-to-bottom"
import {useHistory} from 'react-router-dom';
import {users} from '../group/Group';

let usermsg="Ram"

const ENDPOINT="http://localhost:4500/";
function Chat() {
     //console.log(users)
     const [user]=useState(13);
     var [msg,setMsg]=useState("")
     const [id,setid]=useState("")
     const [messages,setMessage]=useState([])
     const socket=socketIO(ENDPOINT,{transports:['websocket']});

     const history=useHistory();
     const backHome=()=>{
         history.replace('','http://localhost:3000/chat')
     }

     const search=evt=>{
      if(evt.key==="Enter"){
            const message=document.getElementById('inputMessage').value;
                //console.log(message)
                socket.emit(`message`,(message,id))
                let c=document.getElementById("inputMessage").value=""
                setMsg(c)
            if(message.length>0){
              usermsg=message
          }
      }
  }


    useEffect(()=>{
        socket.on('connect',()=>{
        //alert('coonected');
       setid(socket.id)
    })

    socket.emit('joined',{usermsg})

    socket.on('welcome',(data)=>{
            setMessage([...messages,data])
            //console.log(data.usermsg,data.message)
        })
    socket.on('userJoinde',(data)=>{
        setMessage([...messages,data])
        //console.log(data.usermsg,data.message);
    })
    return ()=>{
        //socket.emit('disconnect');
        //socket.off()
    }
    },[])

    useEffect(()=>{
        socket.on(`sendMessage`,(data)=>{
            setMessage([...messages,data])
            console.log(data.usermsg,data.message,data.id)
        })
        return()=>{
         socket.off();
        }
    }, [messages])

    return (
         <div className="homePage">
            <div  className="homeContainer">
                <div className="addContact">
                    <p className="userInfo">
                        <i onClick={backHome} className="fas fa-chevron-left"></i>
                        <span className="numberUser">{user}</span>
                        <span className="groupLogo"><i className="fas fa-users"></i></span>
                        <span className="groupName">{users.slice(0,14)+".."}</span>
                    </p>
                    <i className="fas fa-user-plus"></i>
                </div>
                <ReactScrollToBottom className="chatBox">
                    {messages.map((item)=> <Message   user={item.id===id?'':'left'} message={item.usermsg} classs={item.id===id?'right':'left'} classs={item.id===id? 'right':'left'}/>)}
                </ReactScrollToBottom> 
                <div className="sendMessageInfo">
                    <span className="messageFiled">
                        <i className="fas fa-plus"> </i>  
                            <input type="text" 
                                placeholder="Type a message" 
                                //onClick={search}
                                onKeyPress={search}
                                onChange={e=>setMsg(e.target.value)}
                                value={msg}
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

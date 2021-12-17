import React,{useState,useEffect} from 'react'
import './home.css'
import User from '../users/user';
import Header from '../../home/header/header';
import { CometChat } from '@cometchat-pro/chat';
import ReactScrollToBottom from "react-scroll-to-bottom"

 const  Home=()=> {
     const [newdata, setUser]=useState([]);

     useEffect(()=>{
        var limit = 30;
        var usersRequest = new CometChat.UsersRequestBuilder()
                                                    .setLimit(limit)
                                                    .build();
    
        usersRequest.fetchNext().then(
        userList => {
            console.log("User list received:", userList);
            setUser(userList);
        }, 
        error => {
            console.log("User list fetching failed with error:", error);
        });

     },[])
    
     
    return (
        <>
        <Header/>
        <div className="homePage">
            <div  className="homeContainer">
                <div className="headerContents">
                   <span className="edit">Edit</span>
                   <span className="chats">Chats</span>
                   <span><i className="far fa-edit"></i></span>
                   </div>
                   <ReactScrollToBottom className="groupBox">
                    {
                       newdata.length && newdata.map((item)=> <User
                       userid={item.uid}
                       key={item.name}
                       lastmsg='I am ok!'
                       lastmsgtime='12:45PM'
                       username={item.name}
                       />   
                        )
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
        </>
    )
}

export default Home
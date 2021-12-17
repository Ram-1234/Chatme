import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import './signup.css';
import { CometChat } from "@cometchat-pro/chat"; //cometchat
import Header from '../header/header';


function Signup() {
const [username,setUsername]=useState('');
const [uid,setUID]=useState('');
const [password,setPass]=useState('');

const history=  useHistory();



function ragisterEvent(e){
    e.preventDefault();
    //var re = /\S+@\S+\.\S+/; //regex for email validation
    if(uid.length>4 && username.length>2 && password.length>6){
        let obj={name:`${username}`,uid:`${uid}`,password:`${password}`}
        //console.log(obj);
        //window.localStorage.setItem('users',JSON.stringify(users));

        // cometchat user creation
        let authKey = "4f01e79ee4dfcc9fa02f6da2afe26e595ee1703e";
        var UID=uid
        var name=username;
        var user = new CometChat.User(UID);
        user.setName(name);
        CometChat.createUser(user, authKey).then(
            user => {
                console.log("user created", user);
            },error => {
                console.log("error", error);
            }
        )

        setUsername('');
        setUID('');
        setPass('');
    }
}




function handleEventHaveAccount(){
    console.log("handleEventHaveAccount");
    history.push('/login')
}

    return (
        <>
            <Header/>
            <form className="signupForm">
                <h1>Signup</h1>
                <label>Username</label><br/>
                <input className="signupInput" onChange={(e)=>setUsername(e.target.value)} type="text" placeholder="Enter user name" value={username} /><br/>
                <label>Userid</label><br/>
                <input className="signupInput" onChange={(e)=>setUID(e.target.value)} type="text" placeholder="Enter userid like ramnayan33" value={uid} /><br/>
                <label>Password</label><br/>
                <input className="signupInput" onChange={(e)=>setPass(e.target.value)} type="password" placeholder="*****" value={password} /><br/><br/>
                <button className="signupButton" onClick={ragisterEvent} >Register</button>
                <label onClick={handleEventHaveAccount}>Already have account</label>
            </form>
        </>
    )
}

export default Signup;

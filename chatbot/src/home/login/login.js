import React,{useState} from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
import {CometChat} from '@cometchat-pro/chat';
import Header from '../header/header';
import Chathome from '../../components/home/Home';


function Login() {
const [password, setPass]=useState('');
const [uid, setUID]=useState('');

const history=useHistory();

function loginEvent(e){
    e.preventDefault();
    
    //var re = /\S+@\S+\.\S+/; //regex for email validation
    if(uid.length>4 && password.length>5){
        let obj={uid:`${uid}`,password:`${password}`}
        //console.log('login event happen')
        //window.localStorage.setItem('users',JSON.stringify(users));

        // cometchat user creation
        let authKey = "4f01e79ee4dfcc9fa02f6da2afe26e595ee1703e";
        var UID=uid;
        CometChat.getLoggedinUser().then(
            (user) => {
                        if(!user){
                    CometChat.login(UID, authKey).then(
                    user => {
                        console.log("Login Successful:", { user }); 
                        history.push('./chathome');   //tab change
                        //fecth all users
                        var limit = 30;
                        var usersRequest = new CometChat.UsersRequestBuilder()
                                                                    .setLimit(limit)
                                                                    .build();

                        usersRequest.fetchNext().then(
                        userList => {
                            console.log("User list received:", userList);
                        }, error => {
                            console.log("User list fetching failed with error:", error);
                        }
                        );
                       

                    }, error => {
                        console.log("Login failed with exception:", { error });    
                    }
                    );
                }
                 }, error => {
                        console.log("Some Error Occured", { error });
                }
        );

        setUID('');
        setPass('')
    }           
}

function handleEventNewAccount(){
    console.log("handleEventNewAccount");
    history.push('./signup')
}

    return (
        <>
            <Header/>
            <form className="loginForm">
                <h1>Login</h1>
                <label>Userid</label><br/>
                <input className="loginInput" onChange={(e)=>setUID(e.target.value)} type="text" placeholder="Enter userid like aryan432" value={uid} /><br/>
                <label>Password</label><br/>
                <input className="loginInput" onChange={(e)=>setPass(e.target.value)} type="password" placeholder="*****"  value={password} /><br/><br/>
                <button className="loginButton" onClick={loginEvent} >Let's chat</button>
                <label>Forget password</label><br/><br/>
                <label onClick={handleEventNewAccount}>New ragistration</label>
            </form>
        </>
    )
}

export default Login;

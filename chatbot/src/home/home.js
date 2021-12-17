import React from 'react';
import { useHistory } from 'react-router-dom';
import Header from './header/header';
import { CometChat } from '@cometchat-pro/chat';
import './home.css'

function Home() {
const history = useHistory();
    
    CometChat.logout().then(
        () => {
        console.log("Logout completed successfully");
        },error=>{
        console.log("Logout failed with exception:",{error});
        }
    );
 
    function connectHandle(){
        console.log("connect event invoked!")
        history.push('/signup')
    }

    return (
        <div className="chathomeContainer">
            <Header/>
            <div className="homeContentContainer">
                <div className="letstMessage">
                    Let's Connect From Long Distance<br/>
                    With Your Friends.
                </div>
                <div className="lesthomeConectButton">
                    <button onClick={connectHandle}>Connect</button>
                </div>
            </div>
        </div>
    )
}

export default Home

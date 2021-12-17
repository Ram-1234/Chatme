import React from 'react'
import './message.css';

function Message(props) {
       console.log(props);
        return (
        <div className={`messageBox ${props.classes}`}>
           {props.text}
        </div>
    )
    
}

export default Message;

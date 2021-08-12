const http = require('http');
const express = require('express');
const cors= require('cors');
const socketIO=require('socket.io');

const app=express();
const port=4500 || process.env.PORT;

const users=[{}];

app.use(cors())
app.get('/',(req,res)=>{
    res.send("HELLo IT'S WORKING! HOME PAGE")
})

app.get('/about',(req,res)=>{
    res.send("HELLo IT'S WORKING! ABOUT PAGE")
})

app.get('/contact',(req,res)=>{
    res.send("HELLo IT'S WORKING! CONTACT PAGE")
})

const server=http.createServer(app);
const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection!")
    socket.on('joined',({usermsg})=>{
      users[socket.id]=usermsg;
      console.log(`${usermsg} has joined`);
      socket.broadcast.emit('userJoinde',{usermsg:"Admin",message:`${usermsg[socket.id]} has joined!`})
       socket.emit('welcome',{usermsg:"Admin",message:`Welcome to the chat ${usermsg[socket.id]}`})
    })

    socket.on(`message`,({message,id})=>{
        io.emit(`sendMessage`,{usermsg:users[id],message,id})
    })

   socket.on('disconnect',()=>{
       socket.broadcast.emit(`leave`,{userms:`Admin`,message:`${users[socket.id]} has left`})
       console.log('User left!')
   })
    
}); 
server.listen(port,()=>{
    console.log(`Server is Working on http://localhost:${port}`);
})




const http = require('http');
const express = require('express');
const cors= require('cors');
const socketIO=require('socket.io');
const hostname='143.110.247.144'
//const { URLSearchParams } = require('url');

const app=express();
const port=4500 || process.env.PORT;

const users=[{}];
app.use(cors())
app.get('/',(req,res)=>{
    res.send("HELLo IT'S WORKING! HOME PAGE")
})

const server=http.createServer(app);
const io=socketIO(server);

io.on("connection",(socket)=>{
    console.log("New Connection!")
    socket.on('joined',({user})=>{
      users[socket.id]=user;
      console.log(`${user} has joined`);
      socket.broadcast.emit('userJoined',{user:"Admin",message:` ${users[socket.id]} has joined!`}) 
      socket.emit('welcome',{user:"Admin",message:`Welcome to the chat,${users[socket.id]}`})
    })
    

    socket.on('message',({message,id})=>{
      io.emit('sendMessage',{user:users[id],message,id})
    })

      socket.on('disconnect',()=>{
       socket.broadcast.emit(`leave`,{userms:`Admin`,message:`${users[socket.id]} has left`})
       console.log('User left!')
   })

});

server.listen(port,hostname,()=>{
    console.log(`Server is Working on http://${hostname}:${port}`)
})

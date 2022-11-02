const express = require('express')
const path = require('path');
const  socket  = require('socket.io');
const app = express();
const port = 3000;

var http = require('http').Server(app);
var io = require('socket.io')(http);

//
const mainfile= path.join(__dirname , '../')
// laod static file

app.use(express.static(mainfile));



app.get('/', (req,res)=>{
    res.sendFile(mainfile + "/index.html" )
})
// active users 
const activeusers = []
io.on("connection" , (socket)=>{
    socket.on("new_user_joined" , (username)=>{
      console.log('user join', username)
    activeusers[socket.id] = username;
    socket.broadcast.emit('user-joined',username)
    
    socket.on('disconnect',()=>{
       console.log("user left" , username)
      socket.broadcast.emit("user-left" , username)
    })

    })

    socket.on('send',(message)=>{
        socket.broadcast.emit('recieve',{
            message : message,
            username : activeusers[socket.id]

        })
    })
})



http.listen(port, (err)=>{
    if(err) throw err;
    console.log(`server is listing at ${port}`)
})
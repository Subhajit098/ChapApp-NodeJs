

const socket = io();
const form = document.getElementById('sendcont')
const messageInput = document.getElementById('msg_send')
const messageContainer = document.getElementById('messagebox')

const append=(message , position)=>{
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
   messageContainer.appendChild(messageElement);    


}

//send
form.addEventListener('submit',(evnt)=>{
    evnt.preventDefault()
    const message = messageInput.value
    append(`You :${message}`, 'right');
    socket.emit('send', message)
    messageInput.value ='';

})

// user join

const username = prompt("Enter your Username")
socket.emit("new_user_joined", username)

socket.on('user-joined',(username)=>{
    append(`${username} joind the chat ` ,'center')

})



// receiving the message
socket.on('recieve' ,(data)=>{
    append(`${data.username} : ${data.message}`,'left')
})




socket.on("user-left",(username)=>{
    append(`${username} left the  chat` , 'center')
    })
const socket = io('http://localhost:4000');
const form = document.getElementById('send-container');
const messageInput = document.getElementById('messageInp');
const messageContainer = document.querySelector(".container");

const append = (message, position) => {
    const messageElement = document.createElement('div');
    messageElement.innerText = message;
    messageElement.classList.add('message');
    messageElement.classList.add(position);
    messageContainer.append(messageElement);
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    const message = messageInput.value;
    append(`You: ${message}`, 'right');
    socket.emit('send', message);
    messageInput.value = '';
})
let name;
do {
    name = prompt("Enter your name to join");
} while (!name || name.trim() === "");

socket.emit('new-user-joined', name);

socket.on('user-joined', name => {
    append(`${name} :JOINED THE CHAT`, 'right');
});
// message recieve

socket.on('receive', data => {
    append(`${data.name}: ${data.message}`, 'left');

})



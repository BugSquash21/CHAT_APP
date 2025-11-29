// server.js
const io = require('socket.io')(4000, {
  cors: {
    origin: "http://127.0.0.1:5500", // Allow this origin to connect
    methods: ["GET", "POST"]         // Allowed HTTP methods
  }
});
// node server which handle socke.io
const users = {};
io.on('connection', socket => {

  socket.on('new-user-joined', name => {
   console.log("new user",name);
    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name);
  });
  // If someone sends a message, broadcast it to other people
  socket.on('send', message => {
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
    console.log( { message: message, name: users});
  
  });
  // If someone leaves the chat, let others know....working
})



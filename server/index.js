// create server 
const express = require('express');
const socket = require('socket.io');
const http = require('http');

// user.js 
const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const PORT = process.env.PORT || 5000;

// router 
const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socket(server);

// connect socket and events 
io.on("connection", (socket) => {

    // 'on' client join event 
    socket.on('join', ({ name, room }, callback) => {
        const { error, user } = addUser({ id: socket.id, name, room });
        // username taken
        if (error) return callback(error);

        // join users to room 
        socket.join(user.room);
        
        socket.emit('message', {
            user: 'admin', 
            text: `${ user.name } has entered ${ user.room }`,
        });

        // when new user has joined room: notification from admin
        socket.broadcast
            .to(user.room)
            .emit('message', { user: 'admin', text: `${user.name} has joined!` });

        io.to(user.room).emit('roomData', {
            room: user.room, 
            users: getUsersInRoom(user.room),
        });

        callback();
    });

    // send message
    socket.on('sendMessage', (message) => {
        const user = getUser(socket.id);
        io.to(user.room).emit('message', { user: user.name, text: message });
    });

    socket.on('disconnect', () => {
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', {
                user: 'Admin', 
                text: `${user.name} has left.`
            });
            io.to(user.room).emit('roomData', {
                room: user.room,
                users: getUsersInRoom(user.room)
            });
        }
    });
});

// set router 
app.use(router);

server.listen(PORT, () => console.log(`server has started on port ${PORT}`));
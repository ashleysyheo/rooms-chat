import React, { useEffect, useState } from "react";
import io from 'socket.io-client';
import queryString from 'query-string';
import Messages from './Messages';
import RoomInfo from './RoomInfo';
import Input from './Input';
import './scss/Chat.scss';
import { Link } from "react-router-dom";

let socket; 

const Chat = ({ location }) =>{
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);

    const [users, setUsers] = useState('');

    const ENDPOINT = 'https://rooms-chat-server.herokuapp.com/';

    useEffect(() => {
        const { name, room } = queryString.parse(location.search);

        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);

        socket.emit('join', { name, room }, (error) => {
            if (error) {
                alert(error);
            }
        });
    }, [ENDPOINT, location.search]);

    useEffect(() => {
        // message event from server
        socket.on('message', (message => {
            setMessages([...messages, message]);
        }));

        socket.on('roomData', ({ users })  => {
            setUsers(users);
        });
    }, [messages]);

    const sendMessage = e => {
        e.preventDefault();
        if (message) {
            socket.emit('sendMessage', message, setMessage(''));
        }
    };  

    return (
        <div className='chat'>
            <div className='chat-menu'>
                <p className='chat-menu--text'>rooms</p>
                <button href='/'>
                    <Link to='/'>close</Link>
                </button>
            </div>
            <div className='chat-screen'>
                <RoomInfo room={ room } />
                <Messages messages={ messages } name={ name } />
                <Input message={ message } setMessage={ setMessage } sendMessage={ sendMessage }/>
            </div>
        </div>
    );

};

export default Chat;
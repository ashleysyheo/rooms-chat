import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './scss/JoinRoom.scss';
import rooms_landing from '../rooms_landing.png';

const JoinRoom = () => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div>
            <div className='join-room join-room-container'>
                <h2 className='join-room-container--text'>
                    Get suprised <br />
                    and connect <br />
                    with the world <br />
                    online!
                </h2>
                <img src={ rooms_landing } alt='Rooms' />
            </div>

            <div className='join-room join-room-form'>
                <div className='join-room-form--title'>
                    <p>Welcome to <span className='bold'>rooms</span></p>
                    <p>Sign up to join a chat</p>
                </div>
                <form className='join-room-form--form' noValidate>
                    <label for='username'>Username</label>
                    <input type="text" id='username' name='username' required onChange={(e) => setName(e.target.value)} />

                    <label for='room'>Room</label>
                    <input type='text' id='room' name='room' required onChange={e => setRoom(e.target.value)} />

                    <div className='button'>
                        <Link onClick={ e => (!name || !room ? e.preventDefault() : null) }
                            to={`/chat?name=${name}&room=${room}`}>
                            
                            <button type='submit'>Let's chat!</button>

                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default JoinRoom;
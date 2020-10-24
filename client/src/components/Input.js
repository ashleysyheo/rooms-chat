import React from 'react';
import './scss/Input.scss';

const Input = ({ message, setMessage, sendMessage }) => {
    return (
        <div className='input'>
            <input type='text' placeholder='send message' value={ message } onChange={e => setMessage(e.target.value)} onKeyPress={e => (e.key === 'Enter' ? sendMessage(e) : null )} />
            <button onClick={e => sendMessage(e)}>send</button>
        </div>
    );
};

export default Input;
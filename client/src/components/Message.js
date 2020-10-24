import React from 'react';
import './scss/Message.scss';


const Message = ({ message: { text, user }, name }) => {
    let isAdmin = false; 
    let isSentByCurrentUser = false; 
    const trimmedName = name.trim().toLowerCase();

    if (user === 'admin') {
        isAdmin = true; 
    }

    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return ( isAdmin ? (
                <div className='admin-message-container'>
                    <div className='admin-message'>
                        <p className='admin--text'>{ text }</p>
                    </div>
                </div>
            ) : (<div className='message-container'>
                    <div className='message'>
                        {isSentByCurrentUser ? (
                            <div className='message-box sender'>
                                <div className='message-box--message sender--message'>
                                    <p className='message--text'>{ text }</p>
                                </div>
                                {/* <p className='message-box--user black'>{ trimmedName }</p> */}
                            </div>
                        ) : (
                            <div className='message-box receiver'>
                                <p className='message-box--user black'>{ user }</p>
                                <div className='message-box--message receiver--message'>
                                    <p className='message--text'>{ text }</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>)
    );
};

export default Message;
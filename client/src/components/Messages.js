import React, { useEffect, useRef } from 'react';

import Message from './Message';
import './scss/Messages.scss';

const Messages = ({ messages, name }) => {   
    const containerRef = useRef(null);

    useEffect(() => {

      if(containerRef && containerRef.current) {
        const element = containerRef.current;
        element.scroll({
            top: element.scrollHeight,
            left: 0,
            behavior: "smooth"
        })
      }

    }, [containerRef, messages])
    
    return (
        <div className='messages' ref={containerRef}>
            { messages.map((message, i) => (
                <div key={i}>
                    <Message message={ message } name={ name } />
                </div>
            ))}
        </div>
    );
};

export default Messages;
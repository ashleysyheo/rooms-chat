import React from 'react';
import './scss/RoomInfo.scss';
import { Link } from 'react-router-dom';

const RoomInfo = ({ room }) => {
    return (
        <div className='room-info'>
            <p className='room-info--name'>room: <span className='bold'>{ room }</span></p>
        </div>

    );
};

export default RoomInfo;
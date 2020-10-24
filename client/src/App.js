import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import JoinRoom from './components/JoinRoom';
import Chat from './components/Chat';
import './App.css';

// set router path 
const App = () => {
    return (
        <BrowserRouter>
            <Route path='/' exact component={ JoinRoom } />
            <Route path='/chat' exact component={ Chat } />
        </BrowserRouter>
    )
};

export default App;
import React, { useState } from 'react';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

function Loginpage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const local = 'http://localhost:3001/login';
    const server = 'http://161.35.188.98:3000/login';

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    //Making call to backend to attempt to login
    const handleSubmit = (event) => {
        event.preventDefault();
        // Making call to backend to attempt to login
        axios.post('' + server, {
            username: username,
            password: password
        })
        .then(function(response) {
            //Checks if token is expired, if so, then sends back to login
            const expirationTime = new Date().getTime() + response.data.expiresIn * 1000; // Convert seconds to milliseconds
            // localStorage.setItem('expirationTime', expirationTime);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('username', username);
            navigate('/dashboard');
        })
        .catch(function(error) {
            console.log('fail', error);
        });
    }

    return (
        <div className="App">
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username: </label>
                <input type="text" id="username" value={username} onChange={handleUsernameChange} required/>

                <label htmlFor="password">Password: </label>
                <input type="text" id="password" value={password} onChange={handlePasswordChange} required/>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default Loginpage;
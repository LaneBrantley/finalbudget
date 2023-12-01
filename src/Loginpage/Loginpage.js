import React, { useState } from 'react';
import axios from 'axios';

function Loginpage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

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
        axios.post('161.35.188.98:3000/login', {
            username: username,
            password: password
        })
        .then(function(response) {
            console.log('success', response.data);
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
import axios from 'axios';
import React, { useState } from 'react';

function Signup() {

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const local = 'http://localhost:3001/signup';
  const server = '161.35.188.98:3000/signup';

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
}

const handlePasswordChange = (event) => {
    setPassword(event.target.value);
}

const handleSubmit = (event) => {
  event.preventDefault();
  // Making call to backend to attempt to login
  axios.post(server, {
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
                <input aria-label={"usernameText"} type="text" id="username" value={username} onChange={handleUsernameChange} required/>

                <label htmlFor="password">Password: </label>
                <input aria-label={"passwordText"} type="text" id="password" value={password} onChange={handlePasswordChange} required/>

                <button type="submit">Login</button>
            </form>
    </div>
  );
}

export default Signup;

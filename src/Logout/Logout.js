import { Navigate, useNavigate } from 'react-router-dom';

function Logout() {
const navigate = useNavigate();

  function logoutClick() {
    localStorage.clear();
    navigate('/login');

  }

  return (
    <div className="App">
      <h1>Log out</h1>
      <button onClick={logoutClick}>Logout</button>
    </div>
  );
}

export default Logout;

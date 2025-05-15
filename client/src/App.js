// client/src/App.js
import React, { useState, useEffect } from 'react';
import Login from './Login';
import Register from './Register';
import GameScreen from './GameScreen';

function App() {
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, []);

  const handleLoginSuccess = (userId) => {
    setUserId(userId);
  };

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserId(null);
  };

  return (
      <div>
        <h1>MAI-MMO</h1>
        {userId ? (
            <>
              <GameScreen userId={userId} />
              <button onClick={handleLogout}>Logout</button>
            </>
        ) : (
            <>
              <Login onLoginSuccess={handleLoginSuccess} />
              <Register/>
            </>
        )}
      </div>
  );
}

export default App;
import React, { useState } from 'react';
import logo from "../assets/logo.png";


const PopupUsername = ({ onJoin }) => {
  const [username, setUsername] = useState('');
  const [roomId, setRoomId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username.trim() && roomId.trim()) {
      onJoin(username, roomId);
    }
  };

  return (
    <div className="popup-overlay">
      <div className="popup-container">
        <div className="logo-container">
          <img src={logo} alt="Logo" style={{ height: "40px" }} />
          <h2>
            Socket Chat         
          </h2>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="roomId">Room ID:</label>
            <input
              type="text"
              id="roomId"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="Enter room ID"
              required
            />
          </div>
          <button type="submit" className="join-button">
            <span>Join Chat</span>
            <span style={{ fontSize: '1.2rem' }}>→</span>
          </button>
        </form>
      </div>

      {/* ✅ Correct way: wrap CSS in template string inside <style jsx> */}
      <style>{`
        .popup-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }

        .popup-container {
          background: white;
          padding: 2rem;
          border-radius: 8px;
          width: 100%;
          max-width: 400px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
          .logo-container {
          display: flex;
          align-items: left;
          gap: 10px;
          margin-bottom: 1rem;
          }

        .popup-container h2 {
          margin-top: 0;
          margin-bottom: 1rem;
          color: #333;
          text-align: left;
        }

        .form-group {
          margin-bottom: 1rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          color: #555;
        }

        .form-group input {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 1rem;
          
        }

       .join-button {
  width: 50%;
  padding: 0.75rem 1.5rem;
  color: white; /* keep text white */
  background: rgba(0, 0, 0, 0.5); /* black transparent */
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.3s ease;
  backdrop-filter: blur(4px); /* optional glass effect */
}

.join-button:disabled {
  background: rgba(0, 0, 0, 0.2);
  color: #999;
  cursor: not-allowed;
  transform: none;
}

      `}</style>
    </div>
  );
};

export default PopupUsername;

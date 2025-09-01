// client/src/App.jsx
import { useState, useEffect } from "react";
import ChatInterface from "./components/chatinterface";
import PopupUsername from "./components/popupUsername";
import { io } from "socket.io-client";

const App = () => {
  const [user, setUser] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io("http://localhost:5000");
    setSocket(newSocket);
    
    return () => newSocket.close();
  }, []);

  const handleJoin = (username, roomId) => {
    setUser({ username, roomId });
    if (socket) {
      socket.emit("joinRoom", { username, roomId });
    }
  };

  return (
    
      <div>
        {!user ? (
          <PopupUsername onJoin={handleJoin} />
        ) : (
          <ChatInterface socket={socket} user={user} />
        )}
      </div>
    );
};

export default App;

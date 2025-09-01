import { useState, useEffect } from 'react';

const ChatInterface = ({ socket, user }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
  
    useEffect(() => {
      const handleMessage = (msg) => {
        setMessages((prev) => [...prev, msg]);
      };
      
      socket.on("message", handleMessage);
      
      // Cleanup function to remove the event listener
      return () => {
        socket.off("message", handleMessage);
      };
    }, [socket]);
  
    const sendMessage = () => {
      if (message.trim()) {
        socket.emit("chatMessage", { user: user.username, room: user.roomId, text: message });
        setMessage("");
      }
    };
  
    return (
      <div>
        <h2>Room: {user.roomId}</h2>
        <div>
          {messages.map((m, i) => (
            <p key={i}><b>{m.user}:</b> {m.text}</p>
          ))}
        </div>
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    );
  };

  export default ChatInterface;
import { useState, useEffect, useRef } from 'react';
import Switch from './switch';

const ChatInterface = ({ socket, user }) => {
    const [messages, setMessages] = useState([]);
    const [message, setMessage] = useState("");
    const [isAIAssistantOn, setIsAIAssistantOn] = useState(false);
    const messagesEndRef = useRef(null);
    
    const toggleAIAssistant = () => {
        setIsAIAssistantOn(prevState => !prevState);
    };

    // Auto-scroll to bottom when messages update
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    useEffect(() => {
        const handleMessage = (msg) => {
            setMessages((prev) => [...prev, msg]);
        };

        socket.on("message", handleMessage);

        return () => {
            socket.off("message", handleMessage);
        };
    }, [socket]);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message.trim()) {
            socket.emit("chatMessage", {
                user: user.username,
                room: user.roomId,
                text: message,
                timestamp: new Date().toISOString(),
                aiEnabled: isAIAssistantOn,   
            });
            setMessage("");
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage(e);
        }
    };

    return (
        <div className="chat-container">

            <div className="chat-header">
                <h2>#{user.roomId}</h2>
                <div className="user-info">
                    <span className="username">{user.username}</span>
                    <span className="status-dot">●</span>
                </div>
            </div>

            <div className="messages-container">
                {messages.length === 0 ? (
                    <div className="empty-state">
                        <p>Welcome to the chat! Send a message to get started.</p>
                    </div>
                ) : (
                    messages.map((m, i) => (
                        <div key={i} className={`message ${m.user === user.username ? 'sent' : 'received'}`}>
                            {m.user !== user.username && (
                                <span className="message-sender">{m.user}</span>
                            )}
                            <div className="message-content">
                                <p>{m.text}</p>
                                <span className="message-time">
                                    {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </span>
                            </div>
                        </div>
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
            <form onSubmit={sendMessage} className="message-input-container">
            <Switch isOn={isAIAssistantOn} handleToggle={toggleAIAssistant} />

                <div className="input-wrapper">
                    <textarea
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyPress}
                        placeholder="Type a message..."
                        rows="1"
                    />
                    <button type="submit" disabled={!message.trim()}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </form>

            <style jsx>{`
                .chat-container {
                    display: flex;
                    flex-direction: column;
                    height: 100vh;
                    width: 100%;
                    margin: 0;
                    padding: 0;
                    background: #0e0e10;
                    color: #fff;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                }
                
                @media (min-width: 1024px) {
                    .chat-container {
                        width: 50%;
                        left: 50%;
                        transform: translateX(-50%);
                        border-radius: 0;
                        box-shadow: none;
                    }
                }
                
                .chat-header {
                    padding: 1rem;
                    border-bottom: 1px solid #2d2d35;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    background: rgba(18, 18, 20, 0.95);
                    backdrop-filter: blur(10px);
                    position: sticky;
                    top: 0;
                    z-index: 10;
                }
                
                .chat-header h2 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: #efeff1;
                }
                
                .user-info {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                
                .status-dot {
                    color: #00c03f;
                    font-size: 1.5rem;
                    line-height: 1;
                }
                
                .messages-container {
                    flex: 1;
                    padding: 1rem;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 0.75rem;
                }
                
                .empty-state {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: 100%;
                    color: #adadb8;
                }
                
                .message {
                    max-width: 80%;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }
                
                .message.sent {
                    align-self: flex-end;
                    align-items: flex-end;
                }
                
                .message.received {
                    align-self: flex-start;
                }
                
                .message-sender {
                    font-size: 0.8rem;
                    color: #b8b8bf;
                    margin-left: 0.5rem;
                }
                
                .message-content {
                    background: #1f1f23;
                    padding: 0.75rem 1rem;
                    border-radius: 18px;
                    position: relative;
                    word-break: break-word;
                }
                
                .sent .message-content {
                    background: #2d7ef9;
                    color: white;
                    border-bottom-right-radius: 4px;
                }
                
                .received .message-content {
                    background: #1f1f23;
                    border-bottom-left-radius: 4px;
                }
                
                .message-content p {
                    margin: 0;
                    line-height: 1.4;
                }
                
                .message-time {
                    font-size: 0.7rem;
                    color: #adadb8;
                    margin-left: 0.5rem;
                    white-space: nowrap;
                }
                
                .sent .message-time {
                    color: rgba(255, 255, 255, 0.7);
                }
                
                .message-input-container {
                    padding: 1rem;
                    background: #18181b;
                    border-top: 1px solid #2d2d35;
                }
                
                .input-wrapper {
                    display: flex;
                    gap: 0.5rem;
                    align-items: flex-end;
                    background: #2d2d35;
                    border-radius: 8px;
                    padding: 0.5rem 1rem;
                }
                
                textarea {
                    flex: 1;
                    background: transparent;
                    border: none;
                    color: #efeff1;
                    font-family: inherit;
                    font-size: 1rem;
                    resize: none;
                    max-height: 120px;
                    padding: 0.5rem 0;
                    outline: none;
                }
                
                textarea::placeholder {
                    color: #7d7d85;
                }
                
                button {
                    background: transparent;
                    border: none;
                    color: #7d7d85;
                    cursor: pointer;
                    padding: 0.5rem;
                    border-radius: 4px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.2s;
                }
                
                button:not(:disabled):hover {
                    background: rgba(255, 255, 255, 0.1);
                    color: #efeff1;
                }
                
                button:disabled {
                    cursor: not-allowed;
                    opacity: 0.5;
                }
                
            `}</style>
        </div>
    );
};

export default ChatInterface;

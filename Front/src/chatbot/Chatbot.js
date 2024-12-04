// src/components/Chatbot.js

import React, { useState } from "react";
import axios from "axios";
import "./Chatbot.css"; // Import the CSS file
import WisIcon from "../assets/wis.png"; // Import the Wis icon image

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [userMessage, setUserMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!userMessage) return;

    setMessages((prevMessages) => [
      ...prevMessages,
      { role: "user", content: userMessage },
    ]);

    setLoading(true);

    try {
      const response = await axios.post("http://127.0.0.1:8000/chatbot/chat/", {
        message: userMessage,
      });
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: response.data.response },
      ]);
    } catch (error) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "bot", content: "Sorry, something went wrong." },
      ]);
    } finally {
      setLoading(false);
      setUserMessage("");
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <img src={WisIcon} alt="Wis Icon" className="wis-icon" /> {/* Wis icon */}
        <h1>Wis - Your Retail Chatbot</h1>
      </div>
      <p>Ask me anything about retail, and I'll do my best to assist you!</p>
      <div className="chat-window">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`message ${message.role === "user" ? "user-message" : "bot-message"}`}
          >
            {message.role === "bot" && <img src={WisIcon} alt="Wis Icon" className="wis-icon-small" />} {/* Icon next to bot messages */}
            <strong>{message.role === "user" ? "You" : "Wis"}:</strong> {message.content}
          </div>
        ))}
        {loading && <div className="loading">Wis is typing...</div>}
      </div>
      <input
        type="text"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Ask a retail-related question..."
        className="input"
      />
      <button onClick={sendMessage} className="button">Send</button>
    </div>
  );
};

export default Chatbot;

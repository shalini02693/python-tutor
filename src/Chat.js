import React from "react";
import PropTypes from "prop-types";

function Chat({ chatHistory }) {
  return (
    <div className="chat-box">
      {chatHistory.map((message, index) => (
        <div
          key={index}
          className={message.role === "user" ? "user-message" : "ai-message"}
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}

Chat.propTypes = {
  chatHistory: PropTypes.array.isRequired,
};

export default Chat;

import React, { useState } from "react";
import Chat from "./Chat";
import PythonEditor from "./PythonEditor";
import "./App.css";

function App() {
  const [userInput, setUserInput] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [aiResponse, setAiResponse] = useState("");

  const handleSubmit = () => {
    if (!userInput.trim()) return;

    setChatHistory(prevHistory => [...prevHistory, { role: "user", content: userInput }]);
    fetchAiResponse(userInput);
    setUserInput("");
  };

  const fetchAiResponse = async (input) => {
    try {
      const response = await fetch("https://api-inference.huggingface.co/models/gpt2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: Bearer `${YOUR_HUGGINGFACE_API_KEY}`, // Use your Hugging Face API key here
        },
        body: JSON.stringify({ inputs: input }),
      });

      const data = await response.json();
      const aiReply = data?.generated_text || "I couldn't understand that.";
      
      setAiResponse(aiReply);
      setChatHistory(prevHistory => [...prevHistory, { role: "ai", content: aiReply }]);
    } catch (error) {
      setAiResponse("Error contacting the AI service.");
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1 className="title">Python Fun with AI 🤖</h1>

      <div className="description">
        <p>
          Learn Python interactively with an AI tutor! Ask questions and run code.
        </p>
      </div>

      <div className="chat-container">
        <Chat chatHistory={chatHistory} />
        <input
          type="text"
          placeholder="Ask a Python question..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSubmit()}
        />
        <button onClick={handleSubmit}>Ask</button>
      </div>

      <PythonEditor />

      <div className="ai-response">
        <strong>AI Response:</strong>
        <p>{aiResponse}</p>
      </div>
    </div>
  );
}

export default App;

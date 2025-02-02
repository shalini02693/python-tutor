import React, { useState } from "react";
import axios from "axios";

function PythonEditor() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const response = await axios.post("https://some-python-sandbox-api.com/run", {
        code: code,
      });

      setOutput(response.data.output || "No output or error.");
    } catch (error) {
      setOutput("Error running the code.");
      console.error(error);
    }
  };

  return (
    <div className="editor-container">
      <textarea
        className="code-editor"
        rows="10"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="Write your Python code here..."
      />
      <button onClick={runCode}>Run Code</button>
      <div className="output">
        <h3>Output:</h3>
        <pre>{output}</pre>
      </div>
    </div>
  );
}

export default PythonEditor;

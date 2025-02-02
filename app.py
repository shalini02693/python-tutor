import subprocess
import sys
import openai
from flask import Flask, request, jsonify
from flask_cors import CORS

# Initialize Flask app and enable CORS
app = Flask(__name__)
CORS(app)

# Set up OpenAI API key (replace with your actual API key)
openai.api_key = 'https://api-inference.huggingface.co/models/gpt2'

# Helper function to execute Python code safely
def execute_code(code: str):
    try:
        result = subprocess.run(
            [sys.executable, "-c", code],
            text=True,
            capture_output=True,
            timeout=5
        )
        return {"output": result.stdout, "error": result.stderr} if result.returncode != 0 else {"output": result.stdout}
    except Exception as e:
        return {"error": str(e)}

# Endpoint to execute Python code
@app.route('/execute', methods=['POST'])
def execute():
    data = request.get_json()
    code = data.get('code')

    if not code:
        return jsonify({"error": "No code provided"}), 400

    output = execute_code(code)
    return jsonify(output)

# Endpoint for AI Tutor responses (using OpenAI GPT)
@app.route('/ai_response', methods=['POST'])
def ai_response():
    data = request.get_json()
    question = data.get('question')

    if not question:
        return jsonify({"error": "No question provided"}), 400

    try:
        response = openai.ChatCompletion.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "system", "content": "You are a helpful Python tutor."},
                      {"role": "user", "content": question}],
            max_tokens=150
        )
        return jsonify({"answer": response['choices'][0]['message']['content'].strip()})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
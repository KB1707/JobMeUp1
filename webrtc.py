from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app, origins=["http://127.0.0.1:5000"])

meeting_codes = {}

@app.route('/create_meeting', methods=['POST'])
def create_meeting():
    code = request.json.get('code')
    
    if not code:
        return jsonify({"error": "No meeting code provided"}), 400
    
    if code in meeting_codes:
        return jsonify({"error": "Meeting code already exists"}), 409
    
    meeting_codes[code] = True  
    return jsonify({"message": "Meeting created", "code": code}), 200

@app.route('/verify_meeting', methods=['POST'])
def verify_meeting():
    code = request.json.get('code')
    
    if not code:
        return jsonify({"error": "No meeting code provided"}), 400
    
    if code in meeting_codes:
        return jsonify({"valid": True}), 200
    else:
        return jsonify({"valid": False}), 404

if __name__ == '__main__':
    app.run(debug=True, port=5001)

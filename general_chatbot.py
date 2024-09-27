from flask import Flask, request, jsonify
from transformers import pipeline
from transformers import AutoModelForCausalLM, AutoTokenizer
import re
import os
app = Flask(__name__)
api_token = os.getenv("HUGGINGFACE_API_KEY")

# Load the model and tokenizer
model_name = "google/gemma-2-2b"
#tokenizer = AutoTokenizer.from_pretrained(model_name,use_auth_token=True)
tokenizer = AutoTokenizer.from_pretrained("t5-large",use_auth_token=True)
model = AutoModelForCausalLM.from_pretrained(model_name,use_auth_token=True)

pipe = pipeline(
    "text-generation",
    model=model,
    tokenizer=tokenizer,
    device="cuda", 
    max_new_tokens=256, 
    no_repeat_ngram_size=3, 
    top_k=50, 
    top_p=0.9, 
    temperature=0.7,
    early_stopping=True,
    return_full_text=False,
    num_return_sequences=1
)

def extract_answer(text):
    match = re.search(r'\[Answer 1\](.*?)(\[User|\Z)', text, re.DOTALL)
    if match:
        return match.group(1).strip()  # Extract and clean up the text
    return text

@app.route('/chat', methods=['POST'])
def chat():
    data = request.get_json()
    user_message = data['message']

    # Generate response from the model
    outputs = pipe(user_message)
    response = outputs[0]['generated_text']
    cleaned_text = extract_answer(response)
    return jsonify({'reply': cleaned_text})

if __name__ == '__main__':
    app.run(debug=True)

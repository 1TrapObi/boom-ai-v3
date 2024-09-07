from flask import Flask, request, jsonify
import openai
import pandas as pd
from docx import Document
import pdfplumber
from dotenv import load_dotenv
import os

openai.api_key = os.getenv('OPENAI_API_KEY')

app = Flask(_name_)
load_dotenv()


# Function to extract text from PDF
def extract_text_from_pdf(pdf_path):
    with pdfplumber.open(pdf_path) as pdf:
        text = ""
        for page in pdf.pages:
            text += page.extract_text()
    return text

# Function to extract text from DOCX
def extract_text_from_docx(docx_path):
    doc = Document(docx_path)
    return "\n".join([para.text for para in doc.paragraphs])

# Function to extract data from CSV/Excel with multiple encoding handling
def extract_data_from_csv_excel(file_path):
    encodings = ['utf-8', 'ISO-8859-1', 'latin1', 'cp1252', 'utf-16', 'utf-32']
    for encoding in encodings:
        try:
            if file_path.endswith('.csv'):
                return pd.read_csv(file_path, encoding=encoding)
            else:
                return pd.read_excel(file_path, encoding=encoding)
        except (UnicodeDecodeError, ValueError) as e:
            print(f"Failed to read file with encoding {encoding}: {e}")
            continue
    raise ValueError("Unable to read the file with any known encoding.")

# Function to estimate token count
def estimate_token_count(text):
    return len(text.split())

# Function to trim text to the first 10,000 tokens
def trim_text_to_token_limit(text, max_tokens=9000):
    tokens = text.split()
    trimmed_text = " ".join(tokens[:max_tokens])
    return trimmed_text

# Load the data once when the server starts
file_path = "./data_50.csv"  # Hardcoded file path
combined_data = ""
data = None

if file_path.lower().endswith('.pdf'):
    combined_data = extract_text_from_pdf(file_path)
elif file_path.lower().endswith('.docx'):
    combined_data = extract_text_from_docx(file_path)
elif file_path.lower().endswith(('.csv', '.xlsx')):
    data = extract_data_from_csv_excel(file_path)
    combined_data = data.to_csv(index=False)
else:
    raise ValueError("Unsupported file type. Please provide a PDF, DOCX, CSV, or Excel file.")

# Check the token count and trim if necessary
token_count = estimate_token_count(combined_data)
if token_count > 9000:
    combined_data = trim_text_to_token_limit(combined_data)
    print(f"Data trimmed to 10,000 tokens. Original token count: {token_count}")

# Prepare initial messages for GPT-4
messages = [
    {"role": "system", "content": "You are a helpful assistant."},
    {"role": "user", "content": f"Here is the data:\n{combined_data} now user will ask questions from the data"}
]

@app.route('/ask', methods=['POST'])
def ask_question():
    user_question = request.json.get('question')
    if not user_question:
        return jsonify({'status': 'fail', 'message': 'No question provided.'}), 400

    messages.append({"role": "user", "content": user_question})

    try:
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=messages
        )
        output_text = response.choices[0].message.content
        return jsonify({'status': 'success', 'answer': output_text})
    except Exception as e:
        return jsonify({'status': 'fail', 'message': str(e)}), 500

@app.route('/')
def home():
    return "Chatbot Server is successfully deployed and running!"

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=5001, debug=True)

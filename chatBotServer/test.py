import requests

def ask_gpt(question):
    url = "http://127.0.0.1:5000/ask"
    payload = {'question': question}
    
    response = requests.post(url, json=payload)
    
    if response.status_code == 200:
        result = response.json()
        if result['status'] == 'success':
            print("Answer:", result['answer'])
        else:
            print("Error:", result['message'])
    else:
        print("Failed to connect to the server. Status code:", response.status_code)

if __name__ == "__main__":
    while True:
        user_question = input("Please enter your question (or type 'exit' to end): ")
        if user_question.lower() == 'exit':
            break
        ask_gpt(user_question)

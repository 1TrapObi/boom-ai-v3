// src/apiService.js
import axios from "axios";

const API_KEY = "sk-proj-1TuGD4isHRuf3eu73bVsT3BlbkFJGcBuJxFPQ2IHh4w0vXoe";

const openai = axios.create({
  baseURL: "https://api.openai.com/v1",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
});

export const getResponse = async (prompt) => {
  try {
    const response = await openai.post("/completions", {
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 100,
    });
    return response.data.choices[0].text.trim();
  } catch (error) {
    console.error(
      "Error making request to OpenAI:",
      error.response ? error.response.data : error.message
    );
    throw new Error("Failed to get response from OpenAI");
  }
};

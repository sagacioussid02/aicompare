import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import InputSection from './components/InputSection';
import ResponseSection from './components/ResponseSection';
import './App.css';

const API_URL_GEMINI = 'http://localhost:3001/gemini-api'; // Replace with your actual backend API endpoint for Gemini
const API_URL_OPENAI = 'http://localhost:3001/openai-api'; // Replace with your actual backend API endpoint for OpenAI

function App() {
  const [prompt, setPrompt] = useState('');
  const [responses, setResponses] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const [geminiResponse, openaiResponse] = await Promise.all([
        axios.post(API_URL_GEMINI, { prompt }),
        axios.post(API_URL_OPENAI, { prompt }),
      ]);

      setResponses([geminiResponse.data.response, openaiResponse.data.response]);
    } catch (error) {
      console.error(error);
      setResponses(['An error occurred']);
    }
  };

  return (
    <div className="App">
      <Header />
      <InputSection onSubmit={handleSubmit} prompt={prompt} setPrompt={setPrompt} />
      <ResponseSection responses={responses} />
    </div>
  );
}

export default App;

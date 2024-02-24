require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const base64 = require('base-64');
const { GoogleGenerativeAI, Chat } = require("@google/generative-ai");
const cors = require('cors');
const openai = require('openai');

const app = express();
// Enable CORS for all origins (for development)
app.use(cors());
const port = 3001; // Choose any available port

// Replace with your actual API key
const API_KEY = process.env.API_KEY || "default_value_here";
const genAI = new GoogleGenerativeAI(API_KEY);


app.use(bodyParser.json());

app.post('/gemini-api', async (req, res) => {
    const { prompt } = req.body;

    try {
        const response = await send_to_gemini_api(prompt);
        res.json({ response });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ error: "An error occurred" });
    }
});

async function send_to_gemini_api(prompt) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-pro"});
        //const prompt_b64 = base64.encode(prompt);
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error) {
        throw new Error(`An error occurred while communicating with Gemini API: ${error}`);
    }
}

app.post('/openai-api', async (req, res) => {
    try {
      const prompt = req.body.prompt;
      const openai_client = new openai();
      const response = await openai_client.chat.completions.create({
        model: 'gpt-4-turbo-preview',
        messages: [
          { role: 'user', content: prompt },
        ],
      });
  
      res.json({ response: response.choices[0].message.content });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error processing OpenAI request' });
    }
  });

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
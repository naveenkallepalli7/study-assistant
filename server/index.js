import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Main generate endpoint
app.post('/api/generate', async (req, res) => {
  const { mode, content } = req.body;
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error('Error: GEMINI_API_KEY is not defined in the environment variables.');
    return res.status(500).json({
      error: 'API Configuration Error',
      message: 'The Gemini API Key is missing on the server. Please check the backend .env configuration.'
    });
  }

  if (!content) {
    return res.status(400).json({
      error: 'Invalid Request',
      message: 'Request content cannot be empty.'
    });
  }

  // Construct prompt based on mode (notes vs topic)
  let promptText = '';
  if (mode === 'notes') {
    promptText = `You are a pedagogical expert. Review the following notes and synthesize an interactive study kit.
Create:
1. A clear, concise title summarizing the material.
2. A list of key summary points (3 to 6 bullet points) extracting the core concepts.
3. A set of flashcards (5 to 8 cards) matching key terms with their definitions.
4. A interactive quiz (3 to 5 questions) with multiple-choice options (4 options each) and the exact correct answer specified.

Here are the notes to study:
"""
${content}
"""`;
  } else {
    promptText = `You are a pedagogical expert. Synthesize a comprehensive study guide for the topic: "${content}".
Create:
1. A clear, concise title for this topic.
2. A list of key summary points (3 to 6 bullet points) explaining the core elements of the topic.
3. A set of flashcards (5 to 8 cards) explaining definitions, key terms, or core concepts related to "${content}".
4. An interactive quiz (3 to 5 questions) testing understanding of "${content}" with multiple-choice options (4 options each) and the exact correct answer specified.`;
  }

  try {
    // Call the Gemini API endpoint
    // We use gemini-1.5-flash as the standard fast and reliable model for general text/JSON tasks
    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        contents: [
          {
            parts: [
              {
                text: promptText
              }
            ]
          }
        ],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: 'OBJECT',
            properties: {
              title: { type: 'STRING' },
              summary: {
                type: 'ARRAY',
                items: { type: 'STRING' }
              },
              flashcards: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    front: { type: 'STRING' },
                    back: { type: 'STRING' }
                  },
                  required: ['front', 'back']
                }
              },
              quiz: {
                type: 'ARRAY',
                items: {
                  type: 'OBJECT',
                  properties: {
                    question: { type: 'STRING' },
                    options: {
                      type: 'ARRAY',
                      items: { type: 'STRING' }
                    },
                    answer: { type: 'STRING' }
                  },
                  required: ['question', 'options', 'answer']
                }
              }
            },
            required: ['title', 'summary', 'flashcards', 'quiz']
          }
        }
      },
      {
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    const result = response.data;
    
    // Extract the text content from Gemini's standard format
    if (!result.candidates || result.candidates.length === 0) {
      throw new Error('No candidate content returned from Gemini API.');
    }

    const responseText = result.candidates[0].content.parts[0].text;
    
    // Parse the inner JSON returned by Gemini
    const studyData = JSON.parse(responseText);

    res.json(studyData);
  } catch (error) {
    console.error('Gemini API Error:', error.response?.data || error.message);
    res.status(500).json({
      error: 'AI Generation Failed',
      message: error.response?.data?.error?.message || 'An error occurred while generating study materials. Please try again.'
    });
  }
});

app.listen(PORT, () => {
  console.log(`Study Assistant Server running on http://localhost:${PORT}`);
});

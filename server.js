import express from 'express';
import cors from 'cors';
import { ChatGroq } from '@langchain/groq';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// Setup LangChain Groq LLM
const llm = new ChatGroq({
  model: "llama3-70b-8192",
  temperature: 0.5,
  maxRetries: 2,
});

// Summarize Endpoint
app.post('/summarize', async (req, res) => {
  try {
    const { emailText } = req.body;
    if (!emailText) {
      return res.status(400).json({ error: 'Email text is required' });
    }

    const prompt = `Summarize this email briefly and clearly:\n\n${emailText}`;
    const response = await llm.invoke(prompt);

    const summary = response.content || 'No summary generated';

    res.json({ summary });
  } catch (error) {
    console.error('Summarization Error:', error);
    res.status(500).json({ error: 'Failed to summarize email.' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

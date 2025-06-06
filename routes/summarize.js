import express from 'express';
import { ChatGroq } from '@langchain/groq';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { RunnableSequence } from '@langchain/core/runnables';

const router = express.Router();

// Setup Groq LLM
const llm = new ChatGroq({
  model: 'llama3-70b-8192', // correct model ID from Groq
  temperature: 0,
  apiKey: "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",
});

// POST /summarize route
router.post('/', async (req, res) => {
  try {
    const { emailText } = req.body;
    if (!emailText) {
      return res.status(400).json({ error: 'Email text is required' });
    }

    // Setup prompt template
    const promptTemplate = ChatPromptTemplate.fromTemplate(
      `Summarize this email briefly and clearly:\n\n{email}`
    );

    // Create the runnable chain
    const chain = RunnableSequence.from([
      promptTemplate,
      llm,
    ]);

    // Call the chain
    const response = await chain.invoke({ email: emailText });

    // Extract summary text
    const summary = response?.content || 'No summary generated';

    res.json({ summary });

  } catch (error) {
    console.error('Groq summarize error:', error?.message || error);
    res.status(500).json({ error: 'Failed to generate summary' });
  }
});

export default router;

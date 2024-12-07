import { Request, Response } from 'express';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const handleChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;

    if (!message) {
      res.status(400).json({ error: 'Message is required.' });
      return; // Explicit return to stop further execution
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [{ role: 'user', content: message }],
    });

    const reply = completion.choices[0]?.message?.content;
    res.status(200).json({ reply }); // Respond to the client
  } catch (error) {
    console.error('Chat API Error:', error);
    res.status(500).json({ error: 'Something went wrong.' }); // Handle errors gracefully
  }
};

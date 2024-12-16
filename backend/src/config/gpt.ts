// src/pages/api/gpt.ts
import { NextApiRequest, NextApiResponse } from 'next';
import { getOpenAIResponse } from '../utils/getOpenAIResponse';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Only accept POST requests
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { message } = req.body;

  // Validate input
  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    // Call reusable OpenAI function
    const reply = await getOpenAIResponse(message);
    res.status(200).json({ reply });
  } catch (error) {
    console.error('Error fetching OpenAI response:', error);
    res.status(500).json({ error: 'Failed to get response from OpenAI.' });
  }
}

import { NextApiRequest, NextApiResponse } from 'next';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Stelle sicher, dass der Schlüssel in der .env Datei liegt
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    try {
      // Anfrage an die OpenAI API
      const completion = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: message },
        ],
      });

      const reply = completion.choices[0]?.message?.content;
      if (reply) {
        res.status(200).json({ reply });
      } else {
        res.status(500).json({ error: 'No reply from ChatGPT.' });
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      res.status(500).json({ error: 'Error communicating with ChatGPT.' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}

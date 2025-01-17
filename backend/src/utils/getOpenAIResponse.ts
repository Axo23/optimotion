import OpenAI from 'openai';
import { ChatGptMessage } from '../types/chatGPTMessage';

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getOpenAIResponse = async (messages: ChatGptMessage[]): Promise<string> => {
  try {
    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional fitness coach. Provide tailored fitness advice, training tips, and motivation for users looking to achieve their health goals.',
        },
        ...messages,
      ],
      //response_format: { type: "json_object" },
      max_tokens: 150,
    });

    // Return the assistant's reply
    return completion.choices[0]?.message?.content?.trim() || 'No response from assistant.';
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    throw new Error('Error communicating with OpenAI API.');
  }
};

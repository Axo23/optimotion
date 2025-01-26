import openai from "../config/openaiClient";
import { ChatGptMessage } from '../types/chatGPTMessage';
import { preparePrompt } from '../utils/preparePrompt';
import { UserDataSubset } from "../types/userData";



export const getOpenAIResponse = async (
  messages: ChatGptMessage[],
  userData: UserDataSubset
): Promise<string> => {
  try {
    const prompt = preparePrompt(userData);

    const completion = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'system',
          content: prompt,
        },
        ...messages,
      ],
      max_tokens: 250,
    });

    return completion.choices[0]?.message?.content?.trim() || 'No response from assistant.';
  } catch (error) {
    console.error('Error communicating with OpenAI:', error);
    throw new Error('Error communicating with OpenAI API.');
  }
};

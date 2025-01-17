export type ChatGptMessage = {
    role: 'system' | 'user' | 'assistant';
    content: string;
    name?: string;
  };
  
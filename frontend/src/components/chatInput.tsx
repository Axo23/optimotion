import React, { useState } from 'react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 bg-foreground rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-4 py-2 border rounded-lg bg-background text-lightblue focus:outline-none"
      />
      <button type="submit" className="ml-4 px-4 py-2 bg-lightblue text-white rounded-lg hover:bg-orange">
        Send
      </button>
    </form>
  );
};

export default ChatInput;

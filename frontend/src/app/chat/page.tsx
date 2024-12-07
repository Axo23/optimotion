'use client';

import React, { useState } from 'react';
import ChatInput from '@/components/chatInput';
import MessageList from '@/components/messageList';

interface Message {
  sender: 'user' | 'coach';
  message: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const handleSendMessage = async (userMessage: string) => {
    // Add user message to the chat
    setMessages((prev) => [...prev, { sender: 'user', message: userMessage }]);

    try {
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [...prev, { sender: 'coach', message: data.reply }]);
      } else {
        throw new Error('No response from server.');
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        { sender: 'coach', message: 'Error: Unable to get a response.' },
      ]);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-background text-lightblue">
      <div className="flex-grow overflow-auto">
        <MessageList messages={messages} />
      </div>
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatPage;

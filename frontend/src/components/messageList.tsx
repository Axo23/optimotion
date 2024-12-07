import React from 'react';
import MessageBubble from './messageBubble';

interface Message {
  sender: 'user' | 'coach';
  message: string;
}

interface MessageListProps {
  messages: Message[];
}

const MessageList: React.FC<MessageListProps> = ({ messages }) => {
  return (
    <div className="flex flex-col space-y-2 overflow-auto p-4">
      {messages.map((msg, index) => (
        <MessageBubble key={index} message={msg.message} sender={msg.sender} />
      ))}
    </div>
  );
};

export default MessageList;

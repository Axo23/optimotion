import React from "react";
import MessageBubble from "./messageBubble";
import { Message } from "@/types/message";

interface MessageListProps {
  messages: Message[];
  loading: boolean;
}

const MessageList: React.FC<MessageListProps> = ({ messages, loading }) => {
  return (
    <div className="flex flex-col space-y-2 overflow-auto p-4">
      {messages.map((msg, index) => (
        <MessageBubble key={msg._id || index} message={msg.content} sender={msg.sender} />
      ))}
      {loading && (
        <div className="flex justify-start">
          <div className="px-4 py-2 rounded-lg shadow bg-orange text-white animate-pulse">
            Coach is typing...
          </div>
        </div>
      )}
    </div>
  );
};

export default MessageList;

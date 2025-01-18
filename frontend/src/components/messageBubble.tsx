import React from "react";
import { MessageBubbleProps } from "@/interfaces";


const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender }) => {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`px-4 py-2 rounded-lg shadow ${
          isUser ? "bg-accent text-background" : "bg-tertiary text-background"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default MessageBubble;

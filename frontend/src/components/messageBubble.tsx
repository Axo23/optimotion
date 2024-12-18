import React from "react";

interface MessageBubbleProps {
  message: string;
  sender: "user" | "coach";
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message, sender }) => {
  const isUser = sender === "user";
  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"} my-2`}>
      <div
        className={`px-4 py-2 rounded-lg shadow ${
          isUser ? "bg-lightblue text-white" : "bg-orange text-white"
        }`}
      >
        {message}
      </div>
    </div>
  );
};

export default MessageBubble;

import React, { useState } from "react";
import { Message } from "@/types/message";

interface ChatInputProps {
  onNewMessage: (newMessages: Message[]) => void;
  setLoading: (loading: boolean) => void;
  trainerInteractionID?: string;
  onNewInteraction: (newID: string) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({
  onNewMessage,
  setLoading,
  trainerInteractionID,
  onNewInteraction,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/routes/chat/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: input.trim(),
          sender: "user",
          trainerInteractionID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        const userMessage: Message = {
          sender: "user",
          content: input,
          timeStamp: new Date().toISOString(),
        };

        const coachMessage: Message = {
          sender: "coach",
          content: data.coachMessage.content,
          timeStamp: new Date().toISOString(),
        };

        onNewMessage([userMessage, coachMessage]);

        if (!trainerInteractionID) {
          onNewInteraction(data.trainerInteractionID);
        }
      } else {
        console.error("Error sending message:", data.message);
      }
    } catch (error) {
      console.error("Error calling sendMessage API:", error);
    } finally {
      setLoading(false);
      setIsLoading(false);
      setInput("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 bg-gray-900 rounded-lg shadow-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow px-4 py-2 border rounded-lg bg-gray-900 text-lightblue focus:outline-none"
        disabled={isLoading}
      />
      <button
        type="submit"
        className="ml-4 px-4 py-2 bg-lightblue text-white rounded-lg hover:bg-orange disabled:opacity-50"
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;

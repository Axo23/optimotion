import React, { useState } from "react";

interface ChatInputProps {
  onNewMessage: (newMessages: { sender: "user" | "coach"; message: string }[]) => void;
  trainerInteractionID: string | null; // Pass the interaction ID for ongoing chats
  onNewInteraction: (newTrainerInteractionID: string) => void; // Callback when a new chat is created
}

const ChatInput: React.FC<ChatInputProps> = ({
  onNewMessage,
  trainerInteractionID,
  onNewInteraction,
}) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);

    try {
      // Call sendMessage API
      const response = await fetch("http://localhost:5000/routes/chat/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // Required for JWT-based authentication
        body: JSON.stringify({
          content: input.trim(),
          sender: "user",
          trainerInteractionID,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Add user message to the message list
        onNewMessage([{ sender: "user", message: input }]);

        // Add coach's response to the message list
        if (data.coachMessage) {
          onNewMessage([{ sender: "coach", message: data.coachMessage.content }]);
        }

        // If a new trainerInteractionID is created, update the parent
        if (!trainerInteractionID) {
          onNewInteraction(data.trainerInteractionID);
        }
      } else {
        console.error("Error sending message:", data.message || "Unknown error");
        onNewMessage([
          { sender: "coach", message: "Error: Unable to get a response." },
        ]);
      }
    } catch (error) {
      console.error("Error calling sendMessage API:", error);
      onNewMessage([
        { sender: "coach", message: "Error: Unable to get a response." },
      ]);
    } finally {
      setInput("");
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 bg-gray-900 rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
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

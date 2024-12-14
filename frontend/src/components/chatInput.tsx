import React, { useState } from "react";

interface ChatInputProps {
  onNewMessage: (newMessages: { sender: "user" | "coach"; message: string }[]) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onNewMessage }) => {
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to the messages array
    onNewMessage([{ sender: "user", message: input }]);

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/routes/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input.trim() }),
      });

      const data = await response.json();

      if (response.ok && data.reply) {
        // Add coach response to the messages array
        onNewMessage([{ sender: "coach", message: data.reply }]);
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
    <form onSubmit={handleSubmit} className="flex p-4 bg-foreground rounded-lg shadow-md">
      <input
        type="text"
        placeholder="Type your message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        className="flex-grow px-4 py-2 border rounded-lg bg-background text-lightblue focus:outline-none"
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

import React, { useState } from "react";
import { Message, ChatInputProps } from "@/interfaces";

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
    e.stopPropagation();
    if (!input.trim()) return;

    setLoading(true);
    setIsLoading(true);

    try {
      let interactionID = trainerInteractionID;

      // Create a new TrainerInteraction if none exists
      if (!trainerInteractionID) {
        const interactionResponse = await fetch(
          "http://localhost:5000/routes/chat/createTrainerInteraction",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );

        const newInteraction = await interactionResponse.json();

        if (interactionResponse.ok) {
          interactionID = newInteraction._id;
          onNewInteraction(newInteraction._id); // Notify parent of the new interaction
        } else {
          console.error("Error creating new interaction:", newInteraction.message);
          return;
        }
      }

      // Send the message to the server
      const response = await fetch("http://localhost:5000/routes/chat/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          content: input.trim(),
          sender: "user",
          trainerInteractionID: interactionID, // Use the selected or newly created interaction ID
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
    <form onSubmit={handleSubmit} className="flex p-4 bg-primary rounded-lg shadow-md">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
        className="flex-grow px-4 py-2 border rounded-lg bg-secondary text-foreground focus:outline-none"
      />
      <button
        type="submit"
        className="ml-4 px-4 py-2 bg-secondary text-primary rounded-lg hover:bg-tertiary"
        disabled={!input.trim() || isLoading}
      >
        {isLoading ? "Sending..." : "Send"}
      </button>
    </form>
  );
};

export default ChatInput;

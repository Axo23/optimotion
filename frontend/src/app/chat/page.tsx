"use client";

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import TrainerInteractionSidebar from "@/components/trainerInteractionSidebar";
import ChatInput from "@/components/chatInput";
import MessageList from "@/components/messageList";
import Logo from "@/components/logo";
import BurgerMenu from "@/components/burgerMenu";

interface Message {
  sender: "user" | "coach";
  message: string;
}

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [trainerInteractionID, setTrainerInteractionID] = useState<string | null>(null);

  // Handles new messages and updates the message list
  const handleNewMessages = (newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages]);
  };

  // Handles new interactions (when starting a new chat)
  const handleNewInteraction = (newID: string) => {
    console.log("New Trainer Interaction ID:", newID);
    setTrainerInteractionID(newID);
    setMessages([]); // Reset message list for the new interaction
  };

  // Handles conversation selection in the sidebar
  const handleSelectConversation = (conversationID: string) => {
    console.log("Selected Conversation:", conversationID);
    setTrainerInteractionID(conversationID);
    setMessages([]); // Load messages for this conversation here (if needed)
  };

  return (
    <div className="flex h-screen bg-black text-lightblue relative">
      {/* Left Sidebar: Conversations */}
      <TrainerInteractionSidebar onSelectConversation={handleSelectConversation} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col ml-64">
        {/* Logo */}
        <Logo width={150} height={150} />

        {/* Messages List */}
        <div className="flex-grow overflow-auto px-[30%] md:px-[20%] py-8">
          <MessageList messages={messages} />
        </div>

        {/* Chat Input */}
        <div className="px-[30%] md:px-[20%] pb-8">
          <ChatInput
            onNewMessage={handleNewMessages}
            trainerInteractionID={trainerInteractionID}
            onNewInteraction={handleNewInteraction}
          />
        </div>
      </div>

      {/* Burger Menu for Right Sidebar */}
      <BurgerMenu sidebarContent={<Sidebar />} />
    </div>
  );
};

export default ChatPage;

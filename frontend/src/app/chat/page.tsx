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

  const handleNewMessages = (newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages]);
  };

  const handleSelectConversation = (conversation: string) => {
    console.log("Selected Conversation:", conversation);
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
          <ChatInput onNewMessage={handleNewMessages} />
        </div>
      </div>

      {/* Burger Menu for Right Sidebar */}
      <BurgerMenu sidebarContent={<Sidebar />} />
    </div>
  );
};

export default ChatPage;

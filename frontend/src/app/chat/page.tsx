'use client';

import React, { useState } from "react";
import Sidebar from "@/components/sidebar";
import ChatInput from "@/components/chatInput";
import MessageList from "@/components/messageList";
import Logo from "@/components/logo";

interface Message {
  sender: "user" | "coach";
  message: string;
}

const ChatPage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handleNewMessages = (newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages]);
  };

  return (
    <div className="flex flex-row h-screen bg-black text-lightblue relative">
      {/* Logo Outside Sidebar */}
      <div className="absolute top-2 left-2">
        <Logo width={150} height={150} className="rounded-lg" />
      </div>

      {/* Sidebar */}
      <div className="w-1/5 bg-gray-800 flex flex-col pt-40">
        <div className="flex-grow px-4 space-y-2">
          <h2 className="text-xl font-bold text-white">Conversations</h2>
          <ul className="space-y-2">
            {["Welcome!"].map((conversation, index) => (
              <li
                key={index}
                className="bg-gray-700 p-2 rounded-md text-white cursor-pointer hover:bg-gray-600"
              >
                {conversation}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        <div className="flex-grow overflow-auto px-[30%] md:px-[20%]">
          <MessageList messages={messages} />
        </div>

        {/* Chat Input */}
        <div className="px-[30%] md:px-[20%]">
          <ChatInput onNewMessage={handleNewMessages}
          />
        </div>
      </div>

      {/* Burger Menu */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="absolute top-4 right-4 z-50 bg-gray-700 p-4 rounded-md text-white hover:bg-gray-600 text-2xl"
      >
        ☰
      </button>

      {/* Sidebar */}
      {menuOpen && <Sidebar />}
    </div>
  );
};

export default ChatPage;

"use client";

import React from "react";


interface TrainerInteractionSidebarProps {
  conversations?: string[];
  onSelectConversation?: (conversation: string) => void;
}

const TrainerInteractionSidebar: React.FC<TrainerInteractionSidebarProps> = ({
  conversations = ["Welcome!"],
  onSelectConversation,
}) => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-900 text-white shadow-lg z-40 flex flex-col">
      <div className="text-center mt-10 mb-4 pt-40">    
        <h2 className="text-2xl font-bold text-lightblue">Conversations</h2>
      </div>
      <div className="flex-grow px-4 space-y-4 overflow-y-auto">
        {conversations.map((conversation, index) => (
          <div
            key={index}
            onClick={() => onSelectConversation?.(conversation)}
            className="bg-gray-700 px-4 py-2 rounded-md cursor-pointer hover:bg-gray-600 transition text-lg text-center"
          >
            {conversation}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrainerInteractionSidebar;

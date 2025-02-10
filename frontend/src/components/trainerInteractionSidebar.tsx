import React from "react";
import { SidebarProps } from "@/interfaces";
import { FiTrash2 } from "react-icons/fi";

const TrainerInteractionSidebar: React.FC<SidebarProps> = ({
  interactions,
  onSelectConversation,
  onStartNewConversation,
  onDeleteConversation,
}) => {
  return (
    <div className="w-96 bg-secondary text-foreground h-screen p-4 flex flex-col">
      <h2 className="text-xl text-center font-bold mb-4">Your Conversations</h2>
  
      <button
        onClick={onStartNewConversation}
        className="w-full mb-4 bg-accent text-background py-2 rounded-md hover:bg-tertiary transition"
      >
        Start New Coaching Session
      </button>
  
      {interactions.length === 0 ? (
        <p className="text-neutral">No conversations found</p>
      ) : (
        <ul className="space-y-2 overflow-y-auto flex-grow pr-2">
          {interactions.map((interaction) => (
            <li
              key={interaction._id}
              className="flex items-center justify-between p-2 bg-primary rounded hover:bg-secondary transition text-lg"
            >
              <span
                onClick={() => onSelectConversation(interaction._id)}
                className="cursor-pointer flex-grow"
              >
                {interaction.title || "Untitled Conversation"}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering `onSelectConversation`
                  onDeleteConversation(interaction._id);
                }}
                className="ml-2 bg-tertiary text-black px-2 py-1 rounded hover:bg-primary transition"aria-label="Delete conversation"
                >
                <FiTrash2 size={20} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainerInteractionSidebar;

import React from "react";

interface TrainerInteraction {
  _id: string;
  title: string;
}

interface SidebarProps {
  interactions: TrainerInteraction[];
  onSelectConversation: (id: string) => void;
  onStartNewConversation: () => void; // Prop to handle new session creation
}

const TrainerInteractionSidebar: React.FC<SidebarProps> = ({
  interactions,
  onSelectConversation,
  onStartNewConversation,
}) => {
  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Your Conversations</h2>
      
      {/* Start New Coaching Session Button */}
      <button
        onClick={onStartNewConversation}
        className="w-full mb-4 bg-lightblue text-black py-2 rounded-md hover:bg-orange transition"
      >
        Start New Coaching Session
      </button>

      {/* Existing Conversations */}
      {interactions.length === 0 ? (
        <p>No conversations found</p>
      ) : (
        <ul className="space-y-2">
          {interactions.map((interaction) => (
            <li
              key={interaction._id}
              onClick={() => onSelectConversation(interaction._id)}
              className="cursor-pointer p-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            >
              {interaction.title || "Untitled Conversation"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainerInteractionSidebar;

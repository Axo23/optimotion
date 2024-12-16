'use client';

import React, { useEffect, useState } from 'react';

interface TrainerInteraction {
  id: string;
  title: string;
}

interface SidebarProps {
  onSelectConversation: (id: string) => void;
}

const TrainerInteractionSidebar: React.FC<SidebarProps> = ({ onSelectConversation }) => {
  const [interactions, setInteractions] = useState<TrainerInteraction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // Fetch all trainer interactions on component mount
  useEffect(() => {
    const fetchTrainerInteractions = async () => {
      try {
        const response = await fetch('http://localhost:5000/routes/chat/getTrainerInteractions', {
          credentials: 'include',
        });

        const data = await response.json();
        if (response.ok) {
          setInteractions(data);
        } else {
          console.error('Error fetching interactions:', data.message);
        }
      } catch (error) {
        console.error('Error fetching interactions:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainerInteractions();
  }, []);

  // Handler for starting a new chat
  const handleStartNewChat = async () => {
    try {
      const response = await fetch('http://localhost:5000/routes/chat/createTrainerInteraction', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();
      if (response.ok) {
        const newInteraction: TrainerInteraction = {
          id: data._id,
          title: `Coach Session from ${new Date(data.timeStamp).toLocaleDateString()} ${new Date(
            data.timeStamp
          ).toLocaleTimeString()}`,
        };

        setInteractions((prev) => [newInteraction, ...prev]);
        onSelectConversation(newInteraction.id);
      } else {
        console.error('Error starting new chat:', data.message);
      }
    } catch (error) {
      console.error('Error starting new chat:', error);
    }
  };

  return (
    <div className="w-64 bg-gray-800 text-white h-full p-4">
      <h2 className="text-xl font-bold mb-4">Your Conversations</h2>
      <button
        className="w-full mb-4 bg-lightblue text-black py-2 rounded-md hover:bg-orange transition"
        onClick={handleStartNewChat}
      >
        Start New Chat
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="space-y-2">
          {interactions.map((interaction) => (
            <li
              key={interaction.id}
              onClick={() => onSelectConversation(interaction.id)}
              className="cursor-pointer p-2 bg-gray-700 rounded hover:bg-gray-600 transition"
            >
              {interaction.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrainerInteractionSidebar;

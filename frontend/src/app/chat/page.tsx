"use client";
import React, { useEffect, useState } from "react";
import TrainerInteractionSidebar from "@/components/trainerInteractionSidebar";
import ChatInput from "@/components/chatInput";
import MessageList from "@/components/messageList";
import Logo from "@/components/logo";
import BurgerMenu from "@/components/burgerMenu";
import Sidebar from "@/components/sidebar";
import { TrainerInteraction, Message } from "@/interfaces";

const ChatPage: React.FC = () => {
  const [trainerInteractions, setTrainerInteractions] = useState<TrainerInteraction[]>([]);
  const [trainerInteractionID, setTrainerInteractionID] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch TrainerInteractions
  useEffect(() => {
    const fetchTrainerInteractions = async () => {
      try {
        const response = await fetch("http://localhost:5000/routes/chat/getTrainerInteractions", {
          credentials: "include",
        });
  
        if (!response.ok) {
          console.error("Error fetching interactions:", response.statusText);
          setTrainerInteractions([]); // Ensure interactions is an empty array
          return;
        }
  
        const data = await response.json();
  
        // Ensure data is an array
        if (Array.isArray(data)) {
          setTrainerInteractions(data);
        } else {
          console.error("Invalid data format received for interactions");
          setTrainerInteractions([]); // Fallback to empty array
        }
      } catch (error) {
        console.error("Error fetching interactions:", error);
        setTrainerInteractions([]);
      }
    };
  
    fetchTrainerInteractions();
  }, []);

  // Fetch Messages for a selected TrainerInteraction
  useEffect(() => {
    const fetchMessages = async () => {
      if (!trainerInteractionID) return;
      setLoading(true);
      try {
        const response = await fetch(
          `http://localhost:5000/routes/chat/getMessages/${trainerInteractionID}`,
          { credentials: "include" }
        );
  
        const data = await response.json();
  
        if (response.ok && Array.isArray(data)) {
          // Ensure each message has all required fields
          const formattedMessages = data.map((msg) => ({
            _id: msg._id || "",
            trainerInteractionID: msg.trainerInteractionID || "",
            sender: msg.sender || "user",
            content: msg.content || "",
            timeStamp: msg.timeStamp || new Date().toISOString(),
          }));
          setMessages(formattedMessages);
        } else {
          console.error("Error fetching messages:", data.message || "Unknown error");
          setMessages([]);
        }
      } catch (error) {
        console.error("Error fetching messages:", error);
        setMessages([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchMessages();
  }, [trainerInteractionID]);

  const handleStartNewConversation = async () => {
    try {
      const response = await fetch("http://localhost:5000/routes/chat/createTrainerInteraction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
      });

      const newInteraction = await response.json();

      if (response.ok) {
        setTrainerInteractions((prev) => [newInteraction, ...prev]);
        setTrainerInteractionID(newInteraction._id);
        setMessages([]); // Clear the message list for the new session
        setLoading(false);
      } else {
        console.error("Error creating new interaction:", newInteraction.message);
      }
    } catch (error) {
      console.error("Error creating new interaction:", error);
    }
  };

  const handleNewMessages = (newMessages: Message[]) => {
    setMessages((prev) => [...prev, ...newMessages]);
  };

  const handleNewInteraction = (newID: string) => {
    setTrainerInteractionID(newID);
    setMessages([]);
  };

  const handleSelectConversation = (conversationID: string) => {
    setTrainerInteractionID(conversationID);
  };

  const handleDeleteConversation = async (interactionID: string) => {
    try {
      const response = await fetch(
        `http://localhost:5000/routes/chat/deleteTrainerInteraction/${interactionID}`,
        {
          method: "DELETE",
          credentials: "include",
        }
      );

      if (response.ok) {
        // Remove the deleted interaction from the state
        setTrainerInteractions((prev) =>
          prev.filter((interaction) => interaction._id !== interactionID)
        );
      } else {
        console.error("Error deleting conversation:", await response.text());
      }
    } catch (error) {
      console.error("Error deleting conversation:", error);
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground relative">
      <TrainerInteractionSidebar
        interactions={trainerInteractions}
        onSelectConversation={handleSelectConversation}
        onStartNewConversation={handleStartNewConversation}
        onDeleteConversation={handleDeleteConversation}
      />
      
      <div className="flex-1 flex flex-col ml-40">
        <div className="py-4 text-center">
          <Logo width={150} height={150} />
        </div>
  
        <div className="flex-grow overflow-auto pr-[15%] py-4 mt-28">
          <MessageList messages={messages} loading={loading} />
        </div>
  
        <div className="pr-[15%] pb-4">
          <ChatInput
            onNewMessage={handleNewMessages}
            trainerInteractionID={trainerInteractionID || undefined}
            onNewInteraction={handleNewInteraction}
            setLoading={setLoading}
          />
        </div>
      </div>
  
      <BurgerMenu sidebarContent={<Sidebar />} />
    </div>
  );  
};

export default ChatPage;
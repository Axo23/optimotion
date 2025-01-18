"use client";

import React from "react";
import { useRouter } from "next/navigation";

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:5000/routes/user/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        router.push("/login");
      } else {
        const data = await response.json();
        alert(data.message || "Failed to logout");
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <div className="fixed top-0 right-0 w-64 bg-secondary text-primary h-full shadow-lg z-40 flex flex-col justify-between">
      <div className="text-center space-y-8 mt-28">
        <ul className="space-y-8 text-2xl font-bold">
          <li
            onClick={() => handleNavigation("/profile")}
            className="cursor-pointer hover:text-tertiary transition-all"
          >
            Profile
          </li>
          <li
            onClick={() => handleNavigation("/chat")}
            className="cursor-pointer hover:text-tertiary transition-all"
          >
            Chat
          </li>
          <li
            onClick={() => handleNavigation("/workouts")}
            className="cursor-pointer hover:text-tertiary transition-all"
          >
            Workouts
          </li>
          <li
            onClick={() => handleNavigation("/logs")}
            className="cursor-pointer hover:text-tertiary transition-all"
          >
            Logs
          </li>
        </ul>
      </div>
      <div className="p-4">
        <button
          onClick={handleLogout}
          className="w-full bg-tertiary text-background py-2 rounded-md hover:bg-accent text-lg"
        >
          Logout
        </button>
      </div>
    </div>
  );
  
};

export default Sidebar;

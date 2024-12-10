'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

const Sidebar: React.FC = () => {
  const router = useRouter();

  const handleNavigation = (path: string) => {
    router.push(path);
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5000/routes/user/logout', {
        method: 'POST',
        credentials: 'include',
      });

      if (response.ok) {
        alert('Logout successful!');
        router.push('/login');
      } else {
        const data = await response.json();
        alert(data.message || 'Failed to logout');
      }
    } catch (error) {
      console.error('Error during logout:', error);
      alert('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 text-white shadow-lg z-40 flex flex-col justify-between">
      <div className="text-center space-y-6 mt-20">
        <ul className="space-y-6 text-2xl font-bold">
          <li
            onClick={() => handleNavigation('/profile')}
            className="cursor-pointer hover:text-gray-300"
          >
            Profile
          </li>
          <li
            onClick={() => handleNavigation('/chat')}
            className="cursor-pointer hover:text-gray-300"
          >
            Chat
          </li>
          <li
            onClick={() => handleNavigation('/workouts')}
            className="cursor-pointer hover:text-gray-300"
          >
            Workouts
          </li>
          <li
            onClick={() => handleNavigation('/logs')}
            className="cursor-pointer hover:text-gray-300"
          >
            Logs
          </li>
        </ul>
      </div>
      <div className="p-4 border-t border-gray-700">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-500 text-xl"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

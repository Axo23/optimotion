'use client';

import React, { useState } from 'react';
import AuthMiddleware from '@/components/AuthMiddleware';
import Sidebar from '@/components/sidebar';
import Logo from '@/components/logo';

const ProfilePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [goals, setGoals] = useState<string[]>(['Lose weight', 'Build muscle']);
  const [newGoal, setNewGoal] = useState<string>('');

  const handleAddGoal = () => {
    if (newGoal.trim() === '') return;
    setGoals((prev) => [...prev, newGoal.trim()]);
    setNewGoal('');
  };

  const handleRemoveGoal = (index: number) => {
    setGoals((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <AuthMiddleware>
      <div className="min-h-screen bg-black text-lightblue relative">
        <div className="absolute top-2 left-2">
          <Logo width={150} height={150} className="rounded-lg" />
        </div>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-3xl w-full bg-gray-800 shadow-md rounded-lg p-6 text-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Profile</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Name</label>
                <input
                  type="text"
                  placeholder="John Doe"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  placeholder="john.doe@example.com"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="text"
                  placeholder="25"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Weight (kg)</label>
                <input
                  type="text"
                  placeholder="70"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Height (cm)</label>
                <input
                  type="text"
                  placeholder="175"
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fitness Level</label>
                <select
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                >
                  <option value="Sedentary">Sedentary</option>
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Elite">Elite</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium">Goals</label>
                <ul className="space-y-2 mt-2">
                  {goals.map((goal, index) => (
                    <li key={index} className="flex items-center">
                      <span className="flex-grow">{goal}</span>
                      <button
                        onClick={() => handleRemoveGoal(index)}
                        className="text-red-400 hover:text-red-600 ml-2"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="mt-2 flex">
                  <input
                    type="text"
                    value={newGoal}
                    onChange={(e) => setNewGoal(e.target.value)}
                    placeholder="Add a new goal"
                    className="flex-grow p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                  />
                  <button
                    onClick={handleAddGoal}
                    className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="text-right">
                <button className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="absolute top-4 right-4 z-50 bg-gray-700 p-4 rounded-md text-white hover:bg-gray-600 text-2xl"
        >
          ☰
        </button>
        {menuOpen && <Sidebar />}
      </div>
    </AuthMiddleware>
  );
};

export default ProfilePage;

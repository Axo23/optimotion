'use client';

import React, { useEffect, useState } from 'react';
import AuthMiddleware from '@/components/AuthMiddleware';
import Sidebar from '@/components/sidebar';
import Logo from '@/components/logo';

interface User {
  name: string;
  email: string;
  password: string;
  age: string;
  weight: string;
  height: string;
  fitnessLevel: string;
  goals: string[];
}

const ProfilePage: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    fitnessLevel: 'Beginner',
    goals: [],
  });
  const [newGoal, setNewGoal] = useState<string>('');

  useEffect(() => {
    // Fetch user data on mount
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/routes/user/profile', {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok) {
          setUser(data.user);
        } else {
          console.error(data.message);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  const handleAddGoal = () => {
    if (newGoal.trim() === '') return;
    setUser((prev) => ({
      ...prev,
      goals: [...prev.goals, newGoal.trim()],
    }));
    setNewGoal('');
  };

  const handleRemoveGoal = (index: number) => {
    setUser((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }));
  };

  const handleSaveChanges = async () => {
    try {
      const response = await fetch('http://localhost:5000/routes/user/updateUser', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(user),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Profile updated successfully!');
      } else {
        console.error(data.message);
        alert('Failed to update profile.');
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating your profile.');
    }
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
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Password</label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Age</label>
                <input
                  type="text"
                  value={user.age}
                  onChange={(e) => setUser({ ...user, age: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Weight (kg)</label>
                <input
                  type="text"
                  value={user.weight}
                  onChange={(e) => setUser({ ...user, weight: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Height (cm)</label>
                <input
                  type="text"
                  value={user.height}
                  onChange={(e) => setUser({ ...user, height: e.target.value })}
                  className="w-full mt-1 p-2 border border-gray-600 rounded-md bg-gray-700 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Fitness Level</label>
                <select
                  value={user.fitnessLevel}
                  onChange={(e) => setUser({ ...user, fitnessLevel: e.target.value })}
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
                  {user.goals.map((goal, index) => (
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
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                >
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

'use client';

import React, { useEffect, useState } from 'react';
import AuthMiddleware from '@/components/authMiddleware';
import Sidebar from '@/components/sidebar';
import Logo from '@/components/logo';
import BurgerMenu from "@/components/burgerMenu";
import { User } from "@/interfaces";

const ProfilePage: React.FC = () => {
  const [user, setUser] = useState<User>({
    name: '',
    email: '',
    password: '',
    age: '',
    weight: '',
    height: '',
    fitnessLevel: 'Beginner',
    goals: [],
    preferences: [],
  });
  const [newGoal, setNewGoal] = useState<string>('');
  const [newPreference, setNewPreference] = useState<string>('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:5000/routes/user/profile', {
          credentials: 'include',
        });
        const data = await response.json();
        if (response.ok && data.user) {
          setUser((prevUser) => ({
            ...prevUser,
            ...data.user,
            goals: data.user.goals || [],
            preferences: data.user.preferences || [],
          }));
        } else {
          console.error(data.message || "Failed to fetch user data");
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

  const handleAddPreference = () => {
    if (newPreference.trim() === '') return;
    setUser((prev) => ({
      ...prev,
      preferences: [...prev.preferences, newPreference.trim()],
    }));
    setNewPreference('');
  };

  const handleRemoveGoal = (index: number) => {
    setUser((prev) => ({
      ...prev,
      goals: prev.goals.filter((_, i) => i !== index),
    }));
  };

  const handleRemovePreference = (index: number) => {
    setUser((prev) => ({
      ...prev,
      preferences: prev.preferences.filter((_, i) => i !== index),
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
      <div className="min-h-screen bg-background text-tertiary relative">
        <Logo width={150} height={150} />
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="max-w-3xl w-full bg-secondary shadow-md rounded-lg p-6">
            <h1 className="text-3xl font-bold mb-6 text-center text-primary">Profile</h1>
            <div className="space-y-4">
              <div>
                <label className="block text-xl font-medium text-tertiary">Name</label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(e) => setUser({ ...user, name: e.target.value })}
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Email</label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(e) => setUser({ ...user, email: e.target.value })}
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Password</label>
                <input
                  type="password"
                  value={user.password}
                  onChange={(e) => setUser({ ...user, password: e.target.value })}
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Age</label>
                <input
                  type="text"
                  value={user.age}
                  onChange={(e) => setUser({ ...user, age: e.target.value })}
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Weight (kg)</label>
                <input
                  type="text"
                  value={user.weight}
                  onChange={(e) => setUser({ ...user, weight: e.target.value })}
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Height (cm)</label>
                <input
                  type="text"
                  value={user.height}
                  onChange={(e) => setUser({ ...user, height: e.target.value })}
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                />
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Fitness Level</label>
                <select
                  value={user.fitnessLevel}
                  onChange={(e) => setUser({ ...user, fitnessLevel: e.target.value })}
                  className="w-full mt-1 p-2 border border-primary rounded-md bg-background text-tertiary"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Expert">Expert</option>
                </select>
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Goals</label>
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
                    className="flex-grow p-2 border border-primary rounded-md bg-background text-tertiary"
                  />
                  <button
                    onClick={handleAddGoal}
                    className="ml-2 px-4 py-2 bg-primary text-background rounded-md hover:bg-tertiary"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div>
                <label className="block text-xl font-medium text-tertiary">Preferences</label>
                <ul className="space-y-2 mt-2">
                  {user.preferences.map((preference, index) => (
                    <li key={index} className="flex items-center">
                      <span className="flex-grow">{preference}</span>
                      <button
                        onClick={() => handleRemovePreference(index)}
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
                    value={newPreference}
                    onChange={(e) => setNewPreference(e.target.value)}
                    placeholder="Add a new preference"
                    className="flex-grow p-2 border border-primary rounded-md bg-background text-tertiary"
                  />
                  <button
                    onClick={handleAddPreference}
                    className="ml-2 px-4 py-2 bg-primary text-background rounded-md hover:bg-tertiary"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="text-right">
                <button
                  onClick={handleSaveChanges}
                  className="px-6 py-2 bg-primary text-background rounded-md hover:bg-tertiary"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Burger Menu for Right Sidebar */}
        <BurgerMenu sidebarContent={<Sidebar />} />
      </div>

    </AuthMiddleware>
  );
};

export default ProfilePage;

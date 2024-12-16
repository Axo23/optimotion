// HomePage.tsx
import React from "react";
import Logo from "@/components/logo";
import Link from "next/link";

const HomePage: React.FC = () => {
  return (
    <div className="bg-black text-white font-sans min-h-screen">
      {/* Navbar */}
      <nav className="fixed top-0 w-full bg-black bg-opacity-80 z-50 shadow-lg">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <Logo width={100} height={100} className="rounded-lg" />
          </div>
          <ul className="flex space-x-6 text-lg font-medium">
            <li>
              <Link href="/" className="text-white hover:text-lightblue transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/chat" className="text-white hover:text-lightblue transition">
                Chat
              </Link>
            </li>
            <li>
              <Link href="/workouts" className="text-white hover:text-lightblue transition">
                Workouts
              </Link>
            </li>
            <li>
              <Link href="/logs" className="text-white hover:text-lightblue transition">
                Logs
              </Link>
            </li>
            <li>
              <Link href="/profile" className="text-white hover:text-lightblue transition">
                Profile
              </Link>
            </li>
            <li>
              <button
                className="text-white hover:text-red-400 transition"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Header Section */}
      <header
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/fitness-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <Logo width={200} height={200} className="mb-6" />
          <h1 className="text-4xl md:text-6xl font-bold text-lightblue">
            Welcome to Your Fitness Journey
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300">
            Empower your body. Strengthen your mind. Achieve your goals.
          </p>
          <button className="mt-8 px-6 py-3 bg-lightblue text-black font-bold rounded-lg hover:bg-orange transition-all">
            Get Started
          </button>
        </div>
      </header>
      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} Optimotion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default HomePage;

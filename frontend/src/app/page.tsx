"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faTableList, faInfinity } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="bg-black text-white font-sans min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-transparent  px-8 py-4 flex justify-end z-50">
        <button
          onClick={handleSignIn}
          className="text-lightblue hover:text-orange font-bold text-2xl transition-all"
        >
          Sign In
        </button>
      </nav>

      {/* Header Section */}
      <header
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/images/fitness-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-black opacity-60"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-lightblue">
            Welcome to Your Fitness Journey
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-gray-300">
            Empower your body. Strengthen your mind. Achieve your goals.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-8 px-6 py-3 bg-lightblue text-black font-bold rounded-lg hover:bg-orange transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-lightblue mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-700 rounded-lg shadow-md text-center transition">
              <FontAwesomeIcon icon={faRobot} className="text-4xl text-lightblue mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">AI Coach</h3>
              <p className="text-gray-300">
                A personalized AI coach to guide you through every step of your fitness journey.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg shadow-md text-center transition">
              <FontAwesomeIcon icon={faTableList} className="text-4xl text-lightblue mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Personalized Plans</h3>
              <p className="text-gray-300">
                Custom workout plans for every level, whether you have equipment or not.
              </p>
            </div>
            <div className="p-6 bg-gray-700 rounded-lg shadow-md text-center transition">
              <FontAwesomeIcon icon={faInfinity} className="text-4xl text-lightblue mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">Continuous Support</h3>
              <p className="text-gray-300">
                Round-the-clock assistance to keep you motivated and on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
          <div className="md:w-1/2">
            <Image
              src="/images/fitness-about.jpg"
              alt="About us"
              width={500}
              height={500}
              className="rounded-lg shadow-lg"
              priority
            />
          </div>
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-4xl font-bold text-lightblue mb-4">Who We Are</h2>
            <p className="text-gray-300 leading-relaxed">
              At OptiMotion, we believe that fitness is for everyone. Our goal is to provide a
              supportive environment where you can achieve your goals, whether it&apos;s weight loss,
              muscle building, or simply living a healthier life.
            </p>
            <button className="mt-8 px-6 py-3 bg-lightblue text-black font-bold rounded-lg hover:bg-orange transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-lightblue mb-12">Contact Us</h2>
          <p className="text-gray-300 mb-6">
            Have questions? Reach out to us and let&apos;s get started on your fitness journey.
          </p>
          <button className="px-6 py-3 bg-lightblue text-black font-bold rounded-lg hover:bg-orange transition-all">
            Get In Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-center text-gray-400">
        <p>&copy; {new Date().getFullYear()} OptiMotion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

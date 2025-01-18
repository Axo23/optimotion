"use client";

import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRobot, faTableList, faInfinity } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Logo from "@/components/logo";

const LandingPage: React.FC = () => {
  const router = useRouter();

  const handleGetStarted = () => {
    router.push("/register");
  };

  const handleSignIn = () => {
    router.push("/login");
  };

  return (
    <div className="bg-background text-tertiary font-sans min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 w-full bg-background bg-opacity-90 px-8 py-4 flex justify-end z-50 shadow-md">
        <button
          onClick={handleSignIn}
          className="text-primary hover:text-tertiary font-bold text-2xl transition-all"
        >
          Sign In
        </button>
      </nav>

      {/* Header Section */}
      <header
        className="relative bg-cover bg-center h-screen"
        style={{ backgroundImage: "url('/images/fitness-bg.jpg')" }}
      >
        <div className="absolute inset-0 bg-background opacity-80"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center h-full px-4 mt-16">
          <Logo width={200} height={200} />
          <h1 className="text-4xl md:text-6xl font-bold text-primary">
            Welcome to Your Fitness Journey
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-tertiary">
            Empower your body. Strengthen your mind. Achieve your goals.
          </p>
          <button
            onClick={handleGetStarted}
            className="mt-8 px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-tertiary transition-all"
          >
            Get Started
          </button>
        </div>
      </header>

      {/* Services Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-primary mb-12">
            What We Offer
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="p-6 bg-background rounded-lg shadow-md text-center transition">
              <FontAwesomeIcon icon={faRobot} className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">AI Coach</h3>
              <p className="text-tertiary">
                A personalized AI coach to guide you through every step of your fitness journey.
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-md text-center transition">
              <FontAwesomeIcon icon={faTableList} className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Personalized Plans</h3>
              <p className="text-tertiary">
                Custom workout plans for every level, whether you have equipment or not.
              </p>
            </div>
            <div className="p-6 bg-background rounded-lg shadow-md text-center transition">
              <FontAwesomeIcon icon={faInfinity} className="text-4xl text-primary mb-4" />
              <h3 className="text-2xl font-bold text-primary mb-2">Continuous Support</h3>
              <p className="text-tertiary">
                Round-the-clock assistance to keep you motivated and on track.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-background">
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
            <h2 className="text-4xl font-bold text-primary mb-4">Who We Are</h2>
            <p className="text-tertiary leading-relaxed">
              At OptiMotion, we believe that fitness is for everyone. Our goal is to provide a
              supportive environment where you can achieve your goals, whether it&apos;s weight loss,
              muscle building, or simply living a healthier life.
            </p>
            <button className="mt-8 px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-tertiary transition-all">
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-secondary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-primary mb-12">Contact Us</h2>
          <p className="text-secondary mb-6">
            Have questions? Reach out to us and let&apos;s get started on your fitness journey.
          </p>
          <button className="px-6 py-3 bg-primary text-background font-bold rounded-lg hover:bg-tertiary transition-all">
            Get In Touch
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-secondary text-center text-primary">
        <p>&copy; {new Date().getFullYear()} OptiMotion. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default LandingPage;

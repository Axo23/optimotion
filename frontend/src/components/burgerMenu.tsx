"use client";

import React, { useState } from "react";

interface BurgerMenuProps {
  sidebarContent: React.ReactNode; // Content for the sidebar
}

const BurgerMenu: React.FC<BurgerMenuProps> = ({ sidebarContent }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      {/* Burger Menu Button */}
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 right-4 z-50 bg-gray-900 p-4 rounded-md text-white hover:bg-gray-800 text-2xl"
      >
        ☰
      </button>

      {/* Sidebar Content */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-gray-800 shadow-lg z-40">
          {sidebarContent}
        </div>
      )}
    </>
  );
};

export default BurgerMenu;

"use client";

import React, { useState } from "react";
import { BurgerMenuProps } from "@/interfaces"


const BurgerMenu: React.FC<BurgerMenuProps> = ({ sidebarContent }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="fixed top-4 right-4 z-50 bg-primary p-4 rounded-md text-foreground hover:bg-secondary text-2xl"
      >
        ☰
      </button>
  
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-64 bg-secondary shadow-lg z-40">
          {sidebarContent}
        </div>
      )}
    </>
  );
};

export default BurgerMenu;

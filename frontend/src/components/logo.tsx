"use client";

import React from "react";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string; // Optional className for custom styling
}

const Logo: React.FC<LogoProps> = ({ width = 48, height = 48, className }) => {
  return (
    <Image
      src="/images/optimotion-logo.png" // Ensure the logo is in the public/images directory
      alt="OptiMotion Logo"
      width={width}
      height={height}
      priority
      className={className}
    />
  );
};

export default Logo;

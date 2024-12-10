import React from "react";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string; // Optional className for custom styling
}

const Logo: React.FC<LogoProps> = ({ width = 96, height = 96, className }) => {
  return (
    <Image
      src="/images/opti-logo-sliced-removebg.png"
      alt="OptiMotion Logo"
      width={width}
      height={height}
      priority
      className={className}
      style={{
        backgroundColor: 'transparent',
      }}
    />
  );
};

export default Logo;

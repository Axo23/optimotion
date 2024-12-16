import React from "react";
import Image from "next/image";

interface LogoProps {
  width?: number;
  height?: number;
}

const Logo: React.FC<LogoProps> = ({ width = 96, height = 96 }) => {
  return (
    <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50">
      <Image
        src="/images/opti-logo-sliced-removebg.png"
        alt="OptiMotion Logo"
        width={width}
        height={height}
        priority
        className="rounded-lg"
        style={{
          backgroundColor: "transparent",
        }}
      />
    </div>
  );
};

export default Logo;

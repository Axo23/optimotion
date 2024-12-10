'use client';

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const AuthMiddleware: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch("http://localhost:5000/routes/user/checkAuth", {
          credentials: "include",
        });
        console.log("Auth response:", response.status);
        if (!response.ok) {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        router.push("/login");
      }
    };

    checkAuthentication();
  }, [router]);

  return <>{children}</>;
};

export default AuthMiddleware;

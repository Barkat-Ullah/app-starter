"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useAppSelector } from "@/redux/hooks";

export default function SplashScreen() {
  const router = useRouter();
  const { token, onboardingCompleted } = useAppSelector((state) => state.auth);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);

      if (token && onboardingCompleted) {
        router.push("/dashboard");
      } else {
        router.push("/onboarding");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [onboardingCompleted, router, token]);

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50">
      <motion.div
        className="flex flex-col items-center justify-center"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Clock Icon Animation */}
        <motion.div
          className="w-20 h-20 mb-8 flex items-center justify-center"
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        >
          <svg
            viewBox="0 0 100 100"
            className="w-full h-full text-purple-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="50" cy="50" r="45" />
            <line x1="50" y1="15" x2="50" y2="30" />
            <line x1="50" y1="70" x2="50" y2="85" />
            <line x1="15" y1="50" x2="30" y2="50" />
            <line x1="70" y1="50" x2="85" y2="50" />
            <circle cx="50" cy="50" r="3" fill="currentColor" />
            <line x1="50" y1="50" x2="50" y2="35" strokeLinecap="round" />
            <line x1="50" y1="50" x2="65" y2="50" strokeLinecap="round" />
          </svg>
        </motion.div>

        <motion.h1
          className="text-3xl font-bold text-gray-900 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          Task Manager
        </motion.h1>

        <motion.p
          className="text-gray-600 mt-2 text-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Organize your life
        </motion.p>
      </motion.div>
    </div>
  );
}

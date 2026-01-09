"use client";

import type React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { useAppDispatch } from "@/redux/hooks";
import { setOnboardingCompleted } from "@/redux/features/authSlice";

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const steps: OnboardingStep[] = [
  {
    title: "Stay Organized",
    description: "Keep all your tasks and projects in one place",
    icon: (
      <svg
        className="w-24 h-24 text-purple-600"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <circle cx="30" cy="30" r="8" fill="currentColor" />
        <circle cx="30" cy="55" r="8" fill="currentColor" />
        <circle cx="30" cy="80" r="8" fill="currentColor" />
        <line
          x1="45"
          y1="30"
          x2="80"
          y2="30"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line
          x1="45"
          y1="55"
          x2="80"
          y2="55"
          stroke="currentColor"
          strokeWidth="3"
        />
        <line
          x1="45"
          y1="80"
          x2="80"
          y2="80"
          stroke="currentColor"
          strokeWidth="3"
        />
      </svg>
    ),
  },
  {
    title: "Track Progress",
    description: "Monitor your progress with visual indicators",
    icon: (
      <svg
        className="w-24 h-24 text-blue-600"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <path
          d="M 20 80 L 40 60 L 60 70 L 80 20"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
        />
        <circle cx="20" cy="80" r="4" fill="currentColor" />
        <circle cx="40" cy="60" r="4" fill="currentColor" />
        <circle cx="60" cy="70" r="4" fill="currentColor" />
        <circle cx="80" cy="20" r="4" fill="currentColor" />
      </svg>
    ),
  },
  {
    title: "Boost Productivity",
    description: "Get things done with smart task management",
    icon: (
      <svg
        className="w-24 h-24 text-pink-600"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <path
          d="M 30 50 L 45 65 L 70 35"
          stroke="currentColor"
          fill="none"
          strokeWidth="3"
        />
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </svg>
    ),
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      dispatch(setOnboardingCompleted());
      router.push("/dashboard");
    }
  };

  const handleSkip = () => {
    dispatch(setOnboardingCompleted());
    router.push("/dashboard");
  };

  const step = steps[currentStep];

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Progress Indicator */}
        <div className="flex gap-2 mb-12 justify-center">
          {steps.map((_, index) => (
            <motion.div
              key={index}
              className={`h-2 rounded-full transition-all ${
                index <= currentStep ? "bg-purple-600" : "bg-gray-300"
              }`}
              animate={{ width: index <= currentStep ? 32 : 24 }}
            />
          ))}
        </div>

        {/* Content */}
        <motion.div
          className="text-center"
          key={currentStep}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">{step.icon}</div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            {step.title}
          </h2>
          <p className="text-gray-600 text-lg mb-12">{step.description}</p>
        </motion.div>

        {/* Buttons */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleSkip}
            className="flex-1 rounded-xl h-12 text-base bg-transparent"
          >
            Skip
          </Button>
          <Button
            onClick={handleNext}
            className="flex-1 rounded-xl h-12 text-base bg-purple-600 hover:bg-purple-700 text-white"
          >
            {currentStep === steps.length - 1 ? "Get Started" : "Next"}
          </Button>
        </div>
      </motion.div>
    </div>
  );
}

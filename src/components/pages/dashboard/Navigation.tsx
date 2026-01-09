"use client";

import { pageTransitionVariants } from "@/lib/variant";
import { motion } from "framer-motion";
import { Home, CheckSquare, Settings } from "lucide-react";


export default function BottomNavigation() {
  const navItems = [
    { icon: Home, label: "Home", color: "text-purple-600" },
    { icon: CheckSquare, label: "Tasks", color: "text-gray-400" },
    { icon: Settings, label: "Settings", color: "text-gray-400" },
  ];

  return (
    <motion.div
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-3"
      variants={pageTransitionVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        {navItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <motion.button
              key={item.label}
              className="flex flex-col items-center gap-1 py-2 px-4 rounded-lg hover:bg-gray-100 transition-colors"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <Icon className={`w-6 h-6 ${item.color}`} />
              <span className="text-xs text-gray-600">{item.label}</span>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

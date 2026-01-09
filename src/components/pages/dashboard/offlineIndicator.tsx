
"use client";

import { motion, AnimatePresence } from "framer-motion";
import { WifiOff } from "lucide-react";

interface OfflineIndicatorProps {
  isOnline: boolean;
}

export default function OfflineIndicator({ isOnline }: OfflineIndicatorProps) {
  return (
    <AnimatePresence>
      {!isOnline && (
        <motion.div
          className="fixed top-0 left-0 right-0 bg-orange-500 text-white px-4 py-3 flex items-center gap-2 justify-center z-50"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
        >
          <WifiOff className="w-4 h-4" />
          <span className="text-sm font-medium">
            You're offline - Data cached locally
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

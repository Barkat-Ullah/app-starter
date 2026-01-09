"use client";

import { useState, useEffect } from "react";
import { useAppSelector } from "@/redux/hooks"; 
import { useOfflineSync } from "@/components/hooks/useOfflineHooks";
import OfflineIndicator from "./offlineIndicator";
import BottomNavigation from "./Navigation";


export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAppSelector((state) => state.auth);
  const { isOnline } = useOfflineSync();
  const [showOfflineMessage, setShowOfflineMessage] = useState(false);

  useEffect(() => {
    if (!isOnline) {
      setShowOfflineMessage(true);
      const timer = setTimeout(() => setShowOfflineMessage(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOnline]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-gray-50 to-white pb-32">
      {showOfflineMessage && <OfflineIndicator isOnline={isOnline} />}
      <main className="container mx-auto px-4 py-6">{children}</main>
      <BottomNavigation />
    </div>
  );
}

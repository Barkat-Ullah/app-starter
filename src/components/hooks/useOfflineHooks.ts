"use client";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { useEffect, useState } from "react";
import { offlineStorage } from "../storage/offline";

export function useOfflineSync() {
  const dispatch = useAppDispatch();

  const [isOnline, setIsOnline] = useState(true);
  const [isSynced, setIsSynced] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      syncOfflineChanges();
    };

    const handleOffline = () => {
      setIsOnline(false);
      cacheCurrentState();
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    setIsOnline(navigator.onLine);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const cacheCurrentState = async () => {
    try {
    //   await offlineStorage.saveData({
    //     key: "tasks",
    //     data: tasks,
    //     ttl: 24 * 60 * 60 * 1000,
    //   });

    //   await offlineStorage.saveData({
    //     key: "projects",
    //     data: projects,
    //     ttl: 24 * 60 * 60 * 1000,
    //   });

      setIsSynced(true);
    } catch (error) {
      console.error("Error caching state:", error);
    }
  };

  const syncOfflineChanges = async () => {
    try {
      await cacheCurrentState();
      setIsSynced(true);
    } catch (error) {
      setIsSynced(false);
    }
  };

  return { isOnline, isSynced, syncOfflineChanges, cacheCurrentState };
}

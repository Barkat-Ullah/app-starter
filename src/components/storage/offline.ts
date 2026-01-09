import { isPlatform } from "@ionic/react";
import { Preferences } from "@capacitor/preferences";

/**
 * Offline Storage Manager - Handles caching for mobile offline support
 * Updated for @capacitor/preferences and @ionic/react isPlatform
 */

interface StorageOptions {
  key: string;
  data: any;
  ttl?: number;
}

interface CachedData {
  data: any;
  timestamp: number;
  ttl?: number;
}

class OfflineStorageManager {
  private isMobile = false;
  private prefix = "todoapp_";

  constructor() {
    // Check if running on mobile or capacitor environment
    if (typeof window !== "undefined") {
      this.isMobile =
        isPlatform("ios") || isPlatform("android") || isPlatform("capacitor");
    }
  }

  /**
   * Save data to storage with optional TTL
   */
  async saveData({ key, data, ttl }: StorageOptions): Promise<boolean> {
    try {
      const cacheData: CachedData = {
        data,
        timestamp: Date.now(),
        ttl,
      };

      const storageKey = `${this.prefix}${key}`;
      const jsonValue = JSON.stringify(cacheData);

      if (this.isMobile) {
        // Use Capacitor Preferences for mobile
        await Preferences.set({
          key: storageKey,
          value: jsonValue,
        });
      } else {
        // Use localStorage for web
        localStorage.setItem(storageKey, jsonValue);
      }

      return true;
    } catch (error) {
      console.error("Error saving offline data:", error);
      return false;
    }
  }

  /**
   * Retrieve data from storage
   */
  async getData<T>(key: string): Promise<T | null> {
    try {
      const storageKey = `${this.prefix}${key}`;
      let value: string | null = null;

      if (this.isMobile) {
        const { value: result } = await Preferences.get({ key: storageKey });
        value = result;
      } else {
        value = localStorage.getItem(storageKey);
      }

      if (!value) return null;

      const cacheData: CachedData = JSON.parse(value);

      // Check if data has expired (TTL check)
      if (cacheData.ttl) {
        const age = Date.now() - cacheData.timestamp;
        if (age > cacheData.ttl) {
          await this.removeData(key);
          return null;
        }
      }

      return cacheData.data as T;
    } catch (error) {
      console.error("Error retrieving offline data:", error);
      return null;
    }
  }

  /**
   * Remove data from storage
   */
  async removeData(key: string): Promise<boolean> {
    try {
      const storageKey = `${this.prefix}${key}`;

      if (this.isMobile) {
        await Preferences.remove({ key: storageKey });
      } else {
        localStorage.removeItem(storageKey);
      }

      return true;
    } catch (error) {
      console.error("Error removing offline data:", error);
      return false;
    }
  }

  /**
   * Clear all cached data with the app prefix
   */
  async clearAll(): Promise<boolean> {
    try {
      if (this.isMobile) {
        const { keys } = await Preferences.keys();
        for (const key of keys) {
          if (key.startsWith(this.prefix)) {
            await Preferences.remove({ key });
          }
        }
      } else {
        const keys = Object.keys(localStorage);
        for (const key of keys) {
          if (key.startsWith(this.prefix)) {
            localStorage.removeItem(key);
          }
        }
      }

      return true;
    } catch (error) {
      console.error("Error clearing offline storage:", error);
      return false;
    }
  }

  /**
   * Check if data is available offline
   */
  async isAvailableOffline(key: string): Promise<boolean> {
    const data = await this.getData(key);
    return data !== null;
  }
}

export const offlineStorage = new OfflineStorageManager();

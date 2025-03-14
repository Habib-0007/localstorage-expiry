/**
 * LocalStorageExpiry - A utility for storing data in localStorage with expiration
 * @author Original by Habib Adebayo
 * @version 2.0.0
 * @license MIT
 */

/**
 * Interface for data structure stored in localStorage
 */
interface StorageItem<T> {
    value: T;
    expiry: number | null;
  }
  
  class LocalStorageExpiry {
    /**
     * Set an item in localStorage with optional expiration
     * @param key The key to store the data under
     * @param value The data to store
     * @param ttl Time to live in milliseconds (optional)
     */
    public set<T>(key: string, value: T, ttl?: number): void {
      const item: StorageItem<T> = {
        value,
        expiry: ttl ? new Date().getTime() + ttl : null,
      };
  
      localStorage.setItem(key, JSON.stringify(item));
    }
  
    /**
     * Get an item from localStorage, returns null if expired or not found
     * @param key The key to retrieve data for
     * @returns The stored value or null if expired/not found
     */
    public get<T>(key: string): T | null {
      const itemStr = localStorage.getItem(key);
      
      // Return null if item doesn't exist
      if (!itemStr) {
        return null;
      }
  
      try {
        const item: StorageItem<T> = JSON.parse(itemStr);
        
        // Check if the item has expired
        if (item.expiry && new Date().getTime() > item.expiry) {
          this.remove(key);
          return null;
        }
        
        return item.value;
      } catch (error) {
        // If parsing fails, remove invalid data and return null
        this.remove(key);
        return null;
      }
    }
  
    /**
     * Remove an item from localStorage
     * @param key The key to remove
     */
    public remove(key: string): void {
      localStorage.removeItem(key);
    }
  
    /**
     * Clear all items from localStorage
     */
    public clear(): void {
      localStorage.clear();
    }
  
    /**
     * Check if a key exists and hasn't expired
     * @param key The key to check
     * @returns Boolean indicating if valid item exists
     */
    public exists(key: string): boolean {
      return this.get(key) !== null;
    }
  
    /**
     * Get the time remaining before expiry in milliseconds
     * @param key The key to check
     * @returns Time remaining in milliseconds or null if no expiry/not found
     */
    public getTimeRemaining(key: string): number | null {
      const itemStr = localStorage.getItem(key);
      
      if (!itemStr) {
        return null;
      }
  
      try {
        const item: StorageItem<any> = JSON.parse(itemStr);
        
        if (!item.expiry) {
          return null; // No expiration set
        }
        
        const remaining = item.expiry - new Date().getTime();
        return remaining > 0 ? remaining : 0;
      } catch (error) {
        return null;
      }
    }
  }
  
  // Export as singleton instance
  export default new LocalStorageExpiry();
  
  // Also export class for those who want to instantiate it themselves
  export { LocalStorageExpiry };
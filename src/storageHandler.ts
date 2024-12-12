import { parseJSON, isLocalStorageAvailable } from "./storageUtils";

interface StorageValue<T> {
  value: T;
  expiry: number | null;
}

// Ensure localStorage availability
if (!isLocalStorageAvailable()) {
  throw new Error("LocalStorage is not supported in this environment.");
}

const storagePrefix = "els";

// Set item in localStorage with optional expiry
export function setItem<T>(key: string, value: T, ttlInMs?: number): void {
  if (!key || typeof key !== "string") {
    throw new Error("Invalid key provided.");
  }
  const expiry = ttlInMs ? Date.now() + ttlInMs : null;
  const storageValue: StorageValue<T> = { value, expiry };
  try {
    localStorage.setItem(
      `${storagePrefix}:${key}`,
      JSON.stringify(storageValue)
    );
  } catch (error) {
    console.error("Error setting item in localStorage:", error);
  }
}

// Get item from localStorage
export function getItem<T>(key: string): T | null {
  const item = localStorage.getItem(`${storagePrefix}:${key}`);
  if (!item) return null;

  const storageValue = parseJSON<StorageValue<T>>(item);
  if (!storageValue) return null;

  if (storageValue.expiry && Date.now() > storageValue.expiry) {
    removeItem(key); // Remove expired item
    return null;
  }
  return storageValue.value;
}

// Remove item from localStorage
export function removeItem(key: string): void {
  try {
    localStorage.removeItem(`${storagePrefix}:${key}`);
  } catch (error) {
    console.error("Error removing item from localStorage:", error);
  }
}

// Clear all items with prefix
export function clear(): void {
  Object.keys(localStorage).forEach((key) => {
    if (key.startsWith(storagePrefix)) {
      localStorage.removeItem(key);
    }
  });
}

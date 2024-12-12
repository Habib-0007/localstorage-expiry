// Utility for parsing JSON safely
export function parseJSON<T>(data: string | null): T | null {
  try {
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error("Error parsing JSON:", error);
    return null;
  }
}

// Utility for validating browser storage
export function isLocalStorageAvailable(): boolean {
  try {
    const testKey = "__test__";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    return true;
  } catch {
    return false;
  }
}

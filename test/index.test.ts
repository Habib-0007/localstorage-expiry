import { beforeEach, describe, expect, it, vi } from 'vitest';
import LocalStorageExpiry, { LocalStorageExpiry as LSEClass } from '../src';

describe('LocalStorageExpiry', () => {
  // Mock localStorage
  const localStorageMock = (() => {
    let store: Record<string, string> = {};
    return {
      getItem: vi.fn((key: string) => store[key] || null),
      setItem: vi.fn((key: string, value: string) => {
        store[key] = value.toString();
      }),
      removeItem: vi.fn((key: string) => {
        delete store[key];
      }),
      clear: vi.fn(() => {
        store = {};
      }),
    };
  })();
  
  // Replace global localStorage with mock
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
  });

  beforeEach(() => {
    localStorageMock.clear();
    vi.clearAllMocks();
  });

  describe('set method', () => {
    it('should store data in localStorage', () => {
      LocalStorageExpiry.set('testKey', 'testValue');
      
      expect(localStorageMock.setItem).toHaveBeenCalledTimes(1);
      const parsedItem = JSON.parse(localStorageMock.getItem('testKey') as string);
      expect(parsedItem.value).toBe('testValue');
      expect(parsedItem.expiry).toBeNull();
    });

    it('should store data with expiry when ttl provided', () => {
      const now = new Date('2023-01-01T00:00:00Z').getTime();
      vi.setSystemTime(now);
      
      LocalStorageExpiry.set('testKey', 'testValue', 60000); // 1 minute expiry
      
      const parsedItem = JSON.parse(localStorageMock.getItem('testKey') as string);
      expect(parsedItem.value).toBe('testValue');
      expect(parsedItem.expiry).toBe(now + 60000);
    });
  });

  describe('get method', () => {
    it('should return null for non-existent key', () => {
      expect(LocalStorageExpiry.get('nonExistentKey')).toBeNull();
    });

    it('should return the stored value for non-expired items', () => {
      const now = new Date('2023-01-01T00:00:00Z').getTime();
      vi.setSystemTime(now);
      
      LocalStorageExpiry.set('testKey', 'testValue', 60000); // 1 minute expiry
      
      expect(LocalStorageExpiry.get('testKey')).toBe('testValue');
    });

    it('should return null and remove expired items', () => {
      const now = new Date('2023-01-01T00:00:00Z').getTime();
      vi.setSystemTime(now);
      
      LocalStorageExpiry.set('testKey', 'testValue', 60000); // 1 minute expiry
      
      // Advance time past expiry
      vi.setSystemTime(now + 61000);
      
      expect(LocalStorageExpiry.get('testKey')).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('testKey');
    });

    it('should handle malformed JSON data gracefully', () => {
      localStorageMock.setItem('malformedKey', 'not valid json');
      
      expect(LocalStorageExpiry.get('malformedKey')).toBeNull();
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('malformedKey');
    });
  });

  describe('remove method', () => {
    it('should remove item from localStorage', () => {
      LocalStorageExpiry.set('testKey', 'testValue');
      LocalStorageExpiry.remove('testKey');
      
      expect(localStorageMock.removeItem).toHaveBeenCalledWith('testKey');
    });
  });

  describe('clear method', () => {
    it('should clear all localStorage items', () => {
      LocalStorageExpiry.set('testKey1', 'testValue1');
      LocalStorageExpiry.set('testKey2', 'testValue2');
      LocalStorageExpiry.clear();
      
      expect(localStorageMock.clear).toHaveBeenCalledTimes(1);
    });
  });

  describe('exists method', () => {
    it('should return true for valid, non-expired keys', () => {
      LocalStorageExpiry.set('testKey', 'testValue');
      
      expect(LocalStorageExpiry.exists('testKey')).toBe(true);
    });

    it('should return false for expired keys', () => {
      const now = new Date('2023-01-01T00:00:00Z').getTime();
      vi.setSystemTime(now);
      
      LocalStorageExpiry.set('testKey', 'testValue', 60000);
      
      // Advance time past expiry
      vi.setSystemTime(now + 61000);
      
      expect(LocalStorageExpiry.exists('testKey')).toBe(false);
    });

    it('should return false for non-existent keys', () => {
      expect(LocalStorageExpiry.exists('nonExistentKey')).toBe(false);
    });
  });

  describe('getTimeRemaining method', () => {
    it('should return null for non-existent keys', () => {
      expect(LocalStorageExpiry.getTimeRemaining('nonExistentKey')).toBeNull();
    });

    it('should return null for items without expiry', () => {
      LocalStorageExpiry.set('testKey', 'testValue');
      
      expect(LocalStorageExpiry.getTimeRemaining('testKey')).toBeNull();
    });

    it('should return remaining time for non-expired items', () => {
      const now = new Date('2023-01-01T00:00:00Z').getTime();
      vi.setSystemTime(now);
      
      LocalStorageExpiry.set('testKey', 'testValue', 60000); // 1 minute expiry
      
      // Advance time by 30 seconds
      vi.setSystemTime(now + 30000);
      
      expect(LocalStorageExpiry.getTimeRemaining('testKey')).toBe(30000);
    });

    it('should return 0 for expired items', () => {
      const now = new Date('2023-01-01T00:00:00Z').getTime();
      vi.setSystemTime(now);
      
      LocalStorageExpiry.set('testKey', 'testValue', 60000); // 1 minute expiry
      
      // Advance time past expiry
      vi.setSystemTime(now + 70000);
      
      expect(LocalStorageExpiry.getTimeRemaining('testKey')).toBe(0);
    });
  });

  describe('Class instantiation', () => {
    it('should allow creating a new instance', () => {
      const lse = new LSEClass();
      lse.set('instanceKey', 'instanceValue');
      
      expect(lse.get('instanceKey')).toBe('instanceValue');
    });
  });
});
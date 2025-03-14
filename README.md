# LocalStorage Expiry

A lightweight TypeScript utility for storing data in localStorage with expiration capabilities.

## Features

- Store data in localStorage with optional expiration time
- Automatically removes expired data when retrieved
- Type-safe with TypeScript
- Tiny with zero dependencies
- Simple and intuitive API

## Installation

```bash
npm install localstorage-expiry
```

or

```bash
yarn add localstorage-expiry
```

## Usage

### Basic Usage

```typescript
import LocalStorageExpiry from 'localstorage-expiry';

// Store data without expiration
LocalStorageExpiry.set('user', { name: 'John', role: 'admin' });

// Store data with 1 hour expiration
LocalStorageExpiry.set('session', { token: 'abc123' }, 3600000);

// Retrieve data
const user = LocalStorageExpiry.get('user');
const session = LocalStorageExpiry.get('session');

// Check if a key exists and hasn't expired
if (LocalStorageExpiry.exists('session')) {
  console.log('Session exists!');
}

// Get time remaining until expiry (in milliseconds)
const timeRemaining = LocalStorageExpiry.getTimeRemaining('session');
console.log(`Session expires in ${timeRemaining / 1000} seconds`);

// Remove data
LocalStorageExpiry.remove('session');

// Clear all localStorage data
LocalStorageExpiry.clear();
```

### Advanced Usage

You can also create your own instance of the LocalStorageExpiry class:

```typescript
import { LocalStorageExpiry } from 'localstorage-expiry';

const myStorage = new LocalStorageExpiry();
myStorage.set('custom', { data: 'value' }, 60000); // 1 minute expiry
```

## API

### `set<T>(key: string, value: T, ttl?: number): void`

Stores a value in localStorage with an optional expiration time.

- `key`: The key to store the data under
- `value`: The data to store
- `ttl`: (Optional) Time to live in milliseconds

### `get<T>(key: string): T | null`

Retrieves data from localStorage. Returns null if the item is expired or not found.

- `key`: The key to retrieve data for

### `remove(key: string): void`

Removes an item from localStorage.

- `key`: The key to remove

### `clear(): void`

Clears all items from localStorage.

### `exists(key: string): boolean`

Checks if a key exists and hasn't expired.

- `key`: The key to check

### `getTimeRemaining(key: string): number | null`

Gets the time remaining before expiry in milliseconds.

- `key`: The key to check
- Returns: Time remaining in milliseconds or null if no expiry/not found

## License

MIT

## Credits

Original package by Habib Adebayo
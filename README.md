# LocalStorage with Expiry

A lightweight, secure, and browser-compatible utility for managing localStorage with expiry functionality. This package allows you to store, retrieve, and automatically expire data in the browser's `localStorage`.

---

## Features

- **Expiry Management**: Automatically removes expired items.
- **Prefix Isolation**: Avoids key collisions by using a namespace prefix.
- **Browser Compatibility**: Checks for localStorage support before usage.
- **Error Handling**: Secure and reliable with detailed error messages.
- **Lightweight**: Minimal footprint and dependencies.

---

## Installation

Install the package via npm:

```bash
npm install localstorage-expiry
```

## Usage

### Import the Functions

```typescript
import { setItem, getItem, removeItem, clear } from "localstorage-expiry";
```

### Set an Item with Expiry

Store an item in localStorage with an optional expiry time (in milliseconds):

```typescript
setItem("key1", "value1", 60000); // Expires in 60 seconds
```

### Get an Item

Retrieve the value of an item. If it has expired, null is returned, and the expired item is automatically removed.

```typescript
const value = getItem("key1");
console.log(value); // Output: "value1" or null if expired
```

### Remove an Item

Remove a specific item from localStorage.

```typescript
removeItem("key1");
```

### Clear All Items

Clear all items managed by this package (with the els: prefix).

```typescript
clear();
```

## API Reference

`setItem(key: string, value: any, ttlInMs?: number): void`

- `key`: The key to store the item under (string).
- `value`: The value to store (any type).
- `ttlInMs` (optional): Time-to-live in milliseconds. If omitted, the item will not expire.

`getItem<T>(key: string): T | null`

- `key`: The key of the item to retrieve (string).
- <b> Returns </b>: The value of the item or null if it doesn't exist or has expired.

`removeItem(key: string): void`

`key`: The key of the item to remove (string).

`clear(): void`

Clears all items managed by the package (with the els: prefix).

## Browser Compatibility

This package supports all modern browsers that implement the `localStorage` API. If `localStorage` is not available, an error is thrown during initialization.

## Testing

Run tests to ensure the package behaves as expected:

```bash
npm run test 
```

## Contributing
Contributions are welcome! Please follow these steps:

- Fork the repository.
- Create a feature branch.
- Commit your changes.
- Submit a pull request.

## License
This package is licensed under the MIT License. See the `LICENSE` file for details.

## Example Project
Here’s a quick example of how to use this package in a project:

```typescript
import { setItem, getItem, clear } from "localstorage-expiry";

// Set a value that expires in 5 seconds
setItem("exampleKey", { user: "John Doe" }, 5000);

setTimeout(() => {
  const result = getItem("exampleKey");
  console.log(result); // null after 5 seconds
}, 6000);

// Clear all stored items
clear();
```

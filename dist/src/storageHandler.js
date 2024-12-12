"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setItem = setItem;
exports.getItem = getItem;
exports.removeItem = removeItem;
exports.clear = clear;
var storageUtils_1 = require("./storageUtils");
// Ensure localStorage availability
if (!(0, storageUtils_1.isLocalStorageAvailable)()) {
    throw new Error("LocalStorage is not supported in this environment.");
}
var storagePrefix = "els";
// Set item in localStorage with optional expiry
function setItem(key, value, ttlInMs) {
    if (!key || typeof key !== "string") {
        throw new Error("Invalid key provided.");
    }
    var expiry = ttlInMs ? Date.now() + ttlInMs : null;
    var storageValue = { value: value, expiry: expiry };
    try {
        localStorage.setItem("".concat(storagePrefix, ":").concat(key), JSON.stringify(storageValue));
    }
    catch (error) {
        console.error("Error setting item in localStorage:", error);
    }
}
// Get item from localStorage
function getItem(key) {
    var item = localStorage.getItem("".concat(storagePrefix, ":").concat(key));
    if (!item)
        return null;
    var storageValue = (0, storageUtils_1.parseJSON)(item);
    if (!storageValue)
        return null;
    if (storageValue.expiry && Date.now() > storageValue.expiry) {
        removeItem(key); // Remove expired item
        return null;
    }
    return storageValue.value;
}
// Remove item from localStorage
function removeItem(key) {
    try {
        localStorage.removeItem("".concat(storagePrefix, ":").concat(key));
    }
    catch (error) {
        console.error("Error removing item from localStorage:", error);
    }
}
// Clear all items with prefix
function clear() {
    Object.keys(localStorage).forEach(function (key) {
        if (key.startsWith(storagePrefix)) {
            localStorage.removeItem(key);
        }
    });
}

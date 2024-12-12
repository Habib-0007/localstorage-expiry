"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJSON = parseJSON;
exports.isLocalStorageAvailable = isLocalStorageAvailable;
// Utility for parsing JSON safely
function parseJSON(data) {
    try {
        return data ? JSON.parse(data) : null;
    }
    catch (error) {
        console.error("Error parsing JSON:", error);
        return null;
    }
}
// Utility for validating browser storage
function isLocalStorageAvailable() {
    try {
        var testKey = "__test__";
        localStorage.setItem(testKey, "1");
        localStorage.removeItem(testKey);
        return true;
    }
    catch (_a) {
        return false;
    }
}

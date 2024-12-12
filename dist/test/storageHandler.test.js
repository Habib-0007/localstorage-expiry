"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var storageHandler_1 = require("../src/storageHandler");
describe("LocalStorage with Expiry", function () {
    beforeEach(function () {
        localStorage.clear();
    });
    it("should store and retrieve an item", function () {
        (0, storageHandler_1.setItem)("key1", "value1");
        expect((0, storageHandler_1.getItem)("key1")).toBe("value1");
    });
    it("should expire items after the TTL", function (done) {
        (0, storageHandler_1.setItem)("key2", "value2", 1000); // 1 second expiry
        setTimeout(function () {
            expect((0, storageHandler_1.getItem)("key2")).toBeNull();
            done();
        }, 1100);
    });
    it("should remove an item", function () {
        (0, storageHandler_1.setItem)("key3", "value3");
        (0, storageHandler_1.removeItem)("key3");
        expect((0, storageHandler_1.getItem)("key3")).toBeNull();
    });
    it("should clear all items with prefix", function () {
        (0, storageHandler_1.setItem)("key4", "value4");
        (0, storageHandler_1.setItem)("key5", "value5");
        (0, storageHandler_1.clear)();
        expect((0, storageHandler_1.getItem)("key4")).toBeNull();
        expect((0, storageHandler_1.getItem)("key5")).toBeNull();
    });
});

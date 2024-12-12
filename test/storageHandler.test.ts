import { setItem, getItem, removeItem, clear } from "../src/storageHandler";

describe("LocalStorage with Expiry", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should store and retrieve an item", () => {
    setItem("key1", "value1");
    expect(getItem("key1")).toBe("value1");
  });

  it("should expire items after the TTL", (done) => {
    setItem("key2", "value2", 1000); // 1 second expiry
    setTimeout(() => {
      expect(getItem("key2")).toBeNull();
      done();
    }, 1100);
  });

  it("should remove an item", () => {
    setItem("key3", "value3");
    removeItem("key3");
    expect(getItem("key3")).toBeNull();
  });

  it("should clear all items with prefix", () => {
    setItem("key4", "value4");
    setItem("key5", "value5");
    clear();
    expect(getItem("key4")).toBeNull();
    expect(getItem("key5")).toBeNull();
  });
});

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageWrapper = exports.MemoryStorage = void 0;
class MemoryStorage {
    constructor() {
        this.store = {};
    }
    getItem(key) {
        return Promise.resolve(this.store[key]);
    }
    setItem(key, value) {
        return Promise.resolve(this.store[key] = value);
    }
    removeItem(key) {
        const value = this.store[key];
        delete this.store[key];
        return Promise.resolve(value);
    }
}
exports.MemoryStorage = MemoryStorage;
class StorageWrapper {
    constructor(storage) {
        this.storage = storage;
    }
    getItem(key) {
        return Promise.resolve(this.storage.getItem(key));
    }
    setItem(key, value) {
        return Promise.resolve(this.storage.setItem(key, value));
    }
    removeItem(key) {
        return Promise.resolve(this.storage.removeItem(key));
    }
}
exports.StorageWrapper = StorageWrapper;
//# sourceMappingURL=storage.js.map
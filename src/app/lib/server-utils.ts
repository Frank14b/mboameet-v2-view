"use server";

import nodeCache from 'node-cache';
import crypto from 'crypto';

const myCache = new nodeCache({ stdTTL: 3600 }); // Set default TTL to 60 minutes

// Set item in cache
export const setCache = (key: string, value: string) => {
    myCache.set(key, value);
}

// Retrieve item from cache
export const getCache = (key: string) => {
    const cachedValue = myCache.get(key);
    return cachedValue;
}

export const deleteCache = (key: string) => {
    myCache.del(key);
}

export const checkCache = (key: string): boolean => {
    return myCache.has(key);
}

export const hashingData = (value: string): string => {
    try {
        const password: string = process.env.ENCRYPT_PASSWORD ?? "";
        // SHA-256 (recommended for password hashing)
        const hash: string = crypto.createHash('sha256').update(password).digest('hex');
        return hash;
    } catch (error) {
        return value;
    }
}
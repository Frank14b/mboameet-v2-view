"use server";

import nodeCache from 'node-cache';
import crypto from 'crypto';
import { cookies } from 'next/headers';

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

export const setJwtCookie = (token: string): boolean => {
    try {
        const tokenParts: string[] = token.split('.');

        if(tokenParts.length == 3) {
            const tokenHeader: string = tokenParts[0];
            const tokenPayload: string = tokenParts[1];
            const tokenSignature: string = tokenParts[2];

            cookies().set(hashingData('tokenHeader'), tokenHeader);
            cookies().set(hashingData('tokenPayload'), tokenPayload);
            cookies().set(hashingData('tokenSignature'), tokenSignature);
            
            return true;
        }

        return false;
    } catch (error) {
        return false;
    }
}

export const isTokenExpired = (): boolean => {
    try {
        const tokenHeader: string = cookies().get(hashingData('tokenHeader'))?.value ?? "";
        const tokenPayload: string = cookies().get(hashingData('tokenPayload'))?.value ?? "";

        const decodedHeader: any = JSON.parse(Buffer.from(tokenHeader, 'base64').toString());
        const decodedPayload: any = JSON.parse(Buffer.from(tokenPayload, 'base64').toString());

        if(decodedHeader.alg === 'HS256') {
            if(decodedHeader.typ === 'JWT') {
                if(decodedPayload.exp > Date.now() / 1000) {
                    return false;
                }
            }
        }

        return true;
    } catch (error) {
        return true;
    }
}
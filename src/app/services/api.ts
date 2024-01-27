"use server";

import axios, { CancelTokenSource } from 'axios';
import { RequestMethod } from '../types';

const instance = axios.create({
    baseURL: `${process.env.APP_ENV == 'live' ? process.env.LIVE_API : process.env.DEV_API}/${process.env.API_VERSION}`, // Set your base URL here
});

let requestSource: CancelTokenSource | null = null; // Store cancellation token for each request
const cache: { [key: string]: any } = {}; // In-memory cache

export const apiCall = async ({
    method = "GET",
    url,
    data = null,
    params = null,
    headers = {},
    revalidate = false,
}: {
    method?: RequestMethod,
    url: string,
    data?: any,
    params?: any,
    headers?: any,
    revalidate?: boolean,
}) => {
    try {

        const cacheKey: string = `${method}-${url}-${JSON.stringify(params)}`;

        // Check cache first
        if (!revalidate && cache[cacheKey]) {
            return cache[cacheKey];
        }

        requestSource = axios.CancelToken.source();

        const response = await instance({
            method,
            url,
            data,
            params,
            headers,
            cancelToken: requestSource.token,
            // cache: method === 'GET' ? 'force-cache' : 'no-cache',
        });

        // Store response in cache (only for successful GET requests)
        if (method === 'GET' && response.status === 200) {
            cache[cacheKey] = response.data;
        }

        return response.data;

    } catch (error) {
        if (axios.isCancel(error)) {
            console.log('Request canceled');
        } else {
            throw error; // Re-throw the error for further handling
        }
    } finally {
        if (requestSource) {
            requestSource.cancel(); // Clean up cancellation token
            requestSource = null;
        }
    }
};

// Update cache for a specific URL (optional):
// export const updateCache = async (url: string, params: any) => {
//     const response = await instance.get(url, { cache: 'no-cache' });
//     const cacheKey = `GET-${url}-${JSON.stringify(params)}`; // Assume no params
//     cache[cacheKey] = response.data;
// };
"use server";

import axios, { CancelTokenSource } from "axios";
import { ApiResponseDto, RequestMethod } from "../types";
import { getToken } from "../lib/server-utils";
import { configs } from "../../../app.config";

//create axios api call instance
const instance = axios.create({
  baseURL: `${
    process.env.APP_ENV == "live"
      ? configs.server.LIVE_API
      : configs.server.DEV_API
  }/${configs.server.API_VERSION}`, // Set your base URL here
});

// setup an interceptor for all requests
instance.interceptors.request.use(
  async (config: any) => {
    // Modify request config here
    // Add an authorization header

    // const sessionId: string | undefined = cookies().get('sessionId')?.value;
    const token: string = await getToken();

    if (token.length > 0) {
      config.headers.Authorization = `Bearer ${`${token}`}`;
    }

    return config;
  },
  (error: any) => {
    // Handle request errors here
    console.error("Request error:", error);
    return Promise.reject(error); // Or custom error handling
  }
);

// instance.interceptors.response.use()

let requestSource: CancelTokenSource | null = null; // Store cancellation token for each request
const cache: { [key: string]: any } = {}; // In-memory cache

// create api call function for all methods with caching strategy
export const apiCall = async ({
  method = "GET",
  url,
  data = null,
  params = null,
  headers = {},
  revalidate = false,
}: {
  method?: RequestMethod;
  url: string;
  data?: any;
  params?: any;
  headers?: any;
  revalidate?: boolean;
}): Promise<ApiResponseDto<any>> => {
  try {
    const cacheKey: string = `${method}-${url}-${JSON.stringify(params)}`;

    // Check cache first
    // if (!revalidate && cache[cacheKey]) {
    //     return {
    //         status: true,
    //         message: 'Cached result',
    //         data: cache[cacheKey]
    //     };
    // }

    requestSource = axios.CancelToken.source();

    const response = await instance({
      method,
      url,
      data,
      params,
      headers,
      // cancelToken: requestSource.token,
      // cache: method === 'GET' ? 'force-cache' : 'no-cache',
    });

    // Store response in cache (only for successful GET requests)
    if (method === "GET" && response.status === 200) {
      cache[cacheKey] = response.data;
    }

    return ApiSuccessMessage(response.data, response.status, response.data?.message);
  } catch (error: any) {

    if (axios.isCancel(error)) {
      console.log("Request cancelled");
    }

    if (error.response?.status == 401) {
      console.log("Unauthorized User");
    }

    return ApiErrorMessage(error);
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

export const ApiErrorMessage = (error: any): ApiResponseDto<any> => {
  console.log(error.response.data);
  return {
    status: false,
    message: error?.response?.data?.title ?? error?.response?.data,
    data: error?.response?.data?.errors,
    statusCode: error.code == "ENOTFOUND" ? 4040 : error?.response?.status,
  };
};

export const ApiSuccessMessage = (
  data: any,
  statusCode: number = 200,
  message: string = "Success"
): ApiResponseDto<any> => {
  return {
    status: true,
    message: message,
    data: data,
    statusCode
  };
};

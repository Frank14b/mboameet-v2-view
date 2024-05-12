"use server";

import nodeCache from "node-cache";
import crypto from "crypto";
import { cookies } from "next/headers";
import { ResponseCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { configs } from "../../../app.config";

const myCache = new nodeCache({ stdTTL: 3600 }); // Set default TTL to 60 minutes
const tokenCookieskey: string[] = [
  "tokenHeader",
  "tokenPayload",
  "tokenSignature",
];
const sessionIdCookieKey: string = "sessionId";
let cookieOptions:
  | Partial<ResponseCookie>
  | undefined
  | [options: ResponseCookie] = {
  httpOnly: true,
  secure: configs.server.APP_ENV_MODE == "live" ? true : false, // Only send over HTTPS
  sameSite: "strict", // Prevent cross-site request forgery (CSRF)
  maxAge: 3600, // 1 hour in seconds
};

// Set item in cache
export const setCache = (key: string, value: string) => {
  myCache.set(key, value);
};

// Retrieve item from cache
export const getCache = (key: string) => {
  const cachedValue = myCache.get(key);
  return cachedValue;
};

export const deleteCache = (key: string) => {
  myCache.del(key);
};

export const checkCache = (key: string): boolean => {
  return myCache.has(key);
};

export const hashingData = (value: string): string => {
  try {
    if (configs.APP_ENV_MODE == "dev") return value;

    const password: string = configs.ENCRYPTION_PASSWORD ?? "";
    // SHA-256 (recommended for password hashing)
    const hash: string = crypto
      .createHash("sha256")
      .update(value + password)
      .digest("hex");
    return hash;
  } catch (error) {
    return value;
  }
};

const getJwExpiredTimeInSeconds = (tokenPayload: string) => {
  const decodedPayload: any = JSON.parse(
    Buffer.from(tokenPayload, "base64").toString()
  );

  if (decodedPayload?.exp) {
    return decodedPayload?.exp - decodedPayload?.iat;
  }

  return 0;
};

export const setJwtCookie = ({
  id,
  token,
}: {
  id: string;
  token: string;
}): boolean => {
  try {
    const tokenParts: string[] = token.split(".");

    if (tokenParts.length == 3) {
      const tokenHeader: string = tokenParts[0];
      const tokenPayload: string = tokenParts[1];
      const tokenSignature: string = tokenParts[2];

      cookieOptions = {
        ...cookieOptions,
        maxAge: getJwExpiredTimeInSeconds(tokenPayload),
      };

      cookies().set(
        hashingData(tokenCookieskey[0]),
        tokenHeader,
        cookieOptions
      );
      cookies().set(
        hashingData(tokenCookieskey[1]),
        tokenPayload,
        cookieOptions
      );
      cookies().set(
        hashingData(tokenCookieskey[2]),
        tokenSignature,
        cookieOptions
      );
      cookies().set(hashingData(sessionIdCookieKey), id, cookieOptions);

      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

export const isTokenExpired = async (): Promise<boolean> => {
  try {
    const tokenPayload: string =
      cookies().get(hashingData(tokenCookieskey[1]))?.value ?? "";

    const decodedPayload: any = JSON.parse(
      Buffer.from(tokenPayload, "base64").toString()
    );

    if ((decodedPayload?.exp ?? 0) > Date.now() / 1000) {
      return false;
    }

    deleteToken();

    return true;
  } catch (error) {
    return true;
  }
};

export const getToken = async (): Promise<string> => {
  try {
    const tokenHeader: string =
      cookies().get(hashingData(tokenCookieskey[0]))?.value ?? "";
    const tokenPayload: string =
      cookies().get(hashingData(tokenCookieskey[1]))?.value ?? "";
    const tokenSignature: string =
      cookies().get(hashingData(tokenCookieskey[2]))?.value ?? "";

    const token = `${tokenHeader}.${tokenPayload}.${tokenSignature}`.trim();

    if (token.length < 50) {
      return "";
    }

    return token;
  } catch (error) {
    return "";
  }
};

export const deleteToken = (): boolean => {
  try {
    cookies().delete(hashingData(tokenCookieskey[0]));
    cookies().delete(hashingData(tokenCookieskey[1]));
    cookies().delete(hashingData(tokenCookieskey[2]));

    return true;
  } catch (error) {
    return false;
  }
};

export const getTokenExpiredTime = async (): Promise<number> => {
  try {
    const tokenPayload: string =
      cookies().get(hashingData(tokenCookieskey[1]))?.value ?? "";

    const decodedPayload: any = JSON.parse(
      Buffer.from(tokenPayload, "base64").toString()
    );

    if (decodedPayload?.exp) {
      return parseInt(decodedPayload?.exp, 10);
    }

    return 0;
  } catch (error) {
    return 0;
  }
};

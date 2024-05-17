import { useCallback, useState } from "react";
import { configs } from "../../../app.config";
import {
  decryptDataAsync,
  encryptDataAsync,
  importGeneratedKey,
} from "../lib/encryption";

export type SecurityKeysTypes = {
  publicKey: CryptoKey | null;
  privateKey: CryptoKey | null;
};

const useAppEncryption = () => {
  //
  const [keys, setKeys] = useState<SecurityKeysTypes>({
    publicKey: null,
    privateKey: null,
  });

  const [userKeys, setUserKeys] = useState<SecurityKeysTypes | null>(null);

  const importKeys = useCallback(async () => {
    const publicJWK = JSON.parse(
      configs.GENERAL_JWK_PUBLIC_KEY ?? ""
    ) as JsonWebKey;
    const privateJWK = JSON.parse(
      configs.GENERAL_JWK_PRIVATE_KEY ?? ""
    ) as JsonWebKey;

    const publicKey = await importGeneratedKey(publicJWK, "encrypt");
    const privateKey = await importGeneratedKey(privateJWK, "decrypt");

    setKeys({ publicKey, privateKey });

    return { publicKey, privateKey };
  }, [setKeys]);

  const importUserKeys = useCallback(
    async (publicJWK: JsonWebKey, privateJWK: JsonWebKey) => {
      const publicKey = await importGeneratedKey(publicJWK, "encrypt");
      const privateKey = await importGeneratedKey(privateJWK, "decrypt");

      setUserKeys({ publicKey, privateKey });

      return { publicKey, privateKey };
    },
    [setUserKeys]
  );

  const importPublicKey = useCallback(async (publicJWK: JsonWebKey) => {
    const publicKey = await importGeneratedKey(publicJWK, "encrypt");
    return publicKey;
  }, []);

  const importPrivateKey = useCallback(async (privateJWK: JsonWebKey) => {
    const privateKey = await importGeneratedKey(privateJWK, "decrypt");
    return privateKey;
  }, []);

  const encodeString = useCallback((stringVal: string) => {
    const encoder = new TextEncoder();
    const buffer = encoder.encode(stringVal);
    return buffer;
  }, []);

  const decodeString = useCallback((encodedString: ArrayBuffer) => {
    const decoder = new TextDecoder();
    const data = decoder.decode(encodedString);
    return data;
  }, []);

  const encryptData = useCallback(
    async (data: BufferSource, publicKey: CryptoKey) => {
      const dt = await encryptDataAsync(data, publicKey);
      return dt;
    },
    []
  );

  const decryptData = useCallback(
    async (data: BufferSource, privateKey: CryptoKey) => {
      const dt = await decryptDataAsync(data, privateKey);
      return dt;
    },
    []
  );

  const encodeAndEncryptAsync = useCallback(
    async (data: string, publicKey?: CryptoKey) => {
      //
      const key = publicKey ?? userKeys?.publicKey ?? keys?.publicKey;

      const encoded = encodeString(data);
      const encrypted = await encryptData(encoded, key as CryptoKey);
      return encrypted;
    },
    [keys, userKeys, encodeString, encryptData]
  );

  const decryptAndDecodeAsync = useCallback(
    async (data: Uint8Array, privateKey?: CryptoKey) => {
      //
      const key = privateKey ?? userKeys?.privateKey ?? keys?.privateKey;

      if (!key) return "";
      const decrypted = await decryptData(data, key as CryptoKey);
      const decoded = decodeString(decrypted as ArrayBuffer);
      return decoded;
    },
    [keys, userKeys, decodeString, decryptData]
  );

  const encodeAndEncryptMessageAsync = useCallback(
    async (message: string) => {
      const encryptedMessage: any = await encodeAndEncryptAsync(message);
      const buffer = Buffer.from(encryptedMessage);
      const base64String = buffer.toString("base64");

      return base64String;
    },
    [encodeAndEncryptAsync]
  );

  const decryptAndDecodeMessageAsync = useCallback(
    async (base64String: string) => {
      const bufferMessage = new Buffer(base64String, "base64");
      const message = await decryptAndDecodeAsync(bufferMessage);

      return message;
    },
    [decryptAndDecodeAsync]
  );

  const data = {
    importKeys,
    importUserKeys,
    encodeString,
    decodeString,
    encryptData,
    decryptData,
    encodeAndEncryptAsync,
    decryptAndDecodeAsync,
    encodeAndEncryptMessageAsync,
    decryptAndDecodeMessageAsync,
  };

  return { ...data };
};

export default useAppEncryption;

export interface UseEncryptionProps {
  importKeys: () => Promise<{
    publicKey: CryptoKey | null;
    privateKey: CryptoKey | null;
  }>;
  importUserKeys: (
    publicJWK: JsonWebKey,
    privateJWK: JsonWebKey
  ) => Promise<{
    publicKey: CryptoKey | null;
    privateKey: CryptoKey | null;
  }>;
  encodeString: (stringVal: string) => Uint8Array;
  decodeString: (encodedString: ArrayBuffer) => string;
  encryptData: (
    data: BufferSource,
    publicKey: CryptoKey
  ) => Promise<ArrayBuffer | null>;
  decryptData: (
    data: BufferSource,
    privateKey: CryptoKey
  ) => Promise<ArrayBuffer | null>;
  encodeAndEncryptAsync: (data: string) => Promise<ArrayBuffer | null>;
  decryptAndDecodeAsync: (data: Uint8Array) => Promise<string>;
  encodeAndEncryptMessageAsync: (message: string) => Promise<string>;
  decryptAndDecodeMessageAsync: (base64String: string) => Promise<string>;
}

import { useCallback, useState } from "react";
import {
  decryptDataAsync,
  encryptDataAsync,
  exportGeneratedKey,
  generateEncryptionKeyAsync,
  importGeneratedKey,
} from "../lib/encryption";
import useLocalStorage from "./useLocalStorage";

export type SecurityKeysTypes = {
  publicKey: CryptoKey | null;
  privateKey: CryptoKey | null;
};

export type SecurityJwkKeysTypes = {
  publicKey: JsonWebKey | null;
  privateKey: JsonWebKey | null;
};

const useAppEncryption = () => {
  //
  const [keys, setKeys] = useState<SecurityJwkKeysTypes>({
    publicKey: null,
    privateKey: null,
  });
  const [userKeys, setUserKeys] = useState<SecurityKeysTypes | null>(null);
  const { set, get } = useLocalStorage();

  const importUserKeys = useCallback(
    async (publicJWK: JsonWebKey, privateJWK: JsonWebKey) => {
      const publicKey = await importGeneratedKey(publicJWK, "encrypt");
      const privateKey = await importGeneratedKey(privateJWK, "decrypt");

      setUserKeys({ publicKey, privateKey });

      return { publicKey, privateKey };
    },
    [setUserKeys]
  );

  const generateUserKeys = useCallback(async () => {
    const savedKeys = get("keys");
    //
    if (typeof savedKeys === "string" && savedKeys.length > 0) {
      const JwkKeys = JSON.parse(savedKeys) as SecurityJwkKeysTypes;
      setKeys(JwkKeys);
      return { ...JwkKeys };
    }

    const JwkKeys = (await generateEncryptionKeyAsync()) as SecurityKeysTypes;
    const formattedKeys = {
      publicKey: await exportGeneratedKey(JwkKeys.publicKey as CryptoKey),
      privateKey: await exportGeneratedKey(JwkKeys.privateKey as CryptoKey),
    };
    setKeys(formattedKeys);
    set("keys", JSON.stringify(formattedKeys));
    //
    return { ...formattedKeys };
  }, [set, get, setKeys]);

  const importPublicKey = useCallback(async (publicJWK: JsonWebKey) => {
    const publicKey = await importGeneratedKey(publicJWK, "encrypt");
    return publicKey;
  }, []);

  const importPrivateKey = useCallback(async (privateJWK: JsonWebKey) => {
    const privateKey = await importGeneratedKey(privateJWK, "decrypt");
    return privateKey;
  }, []);
  //

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
      const key = publicKey;

      const encoded = encodeString(data);

      let base64String = "";
      let chunkLimit = 150;

      if (encoded.length > chunkLimit) {
        const chunkNumber = Math.round(encoded.length / chunkLimit) + 1;

        for (let i = 0; i < chunkNumber; i++) {
          let init = i * chunkLimit;
          const datoToChunk = encoded;
          const chunkedData = datoToChunk.slice(init, chunkLimit + init)

          const encrypted = await encryptData(
            chunkedData,
            key as CryptoKey
          );
          const buffer = Buffer.from(encrypted as ArrayBuffer);
          base64String += buffer.toString("base64") + "@@";
        }
      } else {
        const encrypted = await encryptData(encoded, key as CryptoKey);
        const buffer = Buffer.from(encrypted as ArrayBuffer);
        base64String = buffer.toString("base64");
      }

      return base64String;
    },
    [encodeString, encryptData]
  );

  const decryptAndDecodeAsync = useCallback(
    async (data: Uint8Array, privateKey?: CryptoKey) => {
      //
      const key = privateKey;

      if (!key) return "";
      const decrypted = await decryptData(data, key as CryptoKey);
      if (!decrypted) return "";
      const decoded = decodeString(decrypted as ArrayBuffer);
      return decoded;
    },
    [decodeString, decryptData]
  );

  const encodeAndEncryptMessageAsync = useCallback(
    async (message: string, publicKey?: CryptoKey) => {
      const base64String: any = await encodeAndEncryptAsync(message, publicKey);
      return base64String;
    },
    [encodeAndEncryptAsync]
  );

  const decryptAndDecodeMessageAsync = useCallback(
    async (base64String: string, privateKey?: CryptoKey) => {
      //
      const encryptedDataParts = base64String.split("@@");

      let message = "";
      if(encryptedDataParts?.[1]) {
        for(let data of encryptedDataParts) {
          const bufferMessage = new Buffer(data, "base64");
          message += await decryptAndDecodeAsync(bufferMessage, privateKey);
        }
      }else{
        const bufferMessage = new Buffer(base64String, "base64");
        message = await decryptAndDecodeAsync(bufferMessage, privateKey);
      }
      
      return message;
    },
    [decryptAndDecodeAsync]
  );

  const data = {
    savedKeys: keys,
    generateUserKeys,
    importUserKeys,
    encodeString,
    decodeString,
    encryptData,
    decryptData,
    encodeAndEncryptAsync,
    decryptAndDecodeAsync,
    encodeAndEncryptMessageAsync,
    decryptAndDecodeMessageAsync,
    importPrivateKey,
    importPublicKey,
  };

  return { ...data };
};

export default useAppEncryption;

export interface UseEncryptionProps {
  savedKeys: {
    publicKey: JsonWebKey | null;
    privateKey: JsonWebKey | null;
  };
  generateUserKeys: () => Promise<{
    publicKey: JsonWebKey | null;
    privateKey: JsonWebKey | null;
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
  encodeAndEncryptMessageAsync: (
    message: string,
    publicKey?: CryptoKey
  ) => Promise<string>;
  decryptAndDecodeMessageAsync: (
    base64String: string,
    privateKey?: CryptoKey
  ) => Promise<string>;
  importPrivateKey: (privateJWK: JsonWebKey) => Promise<CryptoKey | null>;
  importPublicKey: (publicJWK: JsonWebKey) => Promise<CryptoKey | null>;
}

"use client";

export const generateEncryptionKeyAsync = async () => {
  try {
    const { publicKey, privateKey } = await crypto.subtle.generateKey(
      {
        name: "RSA-OAEP",
        modulusLength: 2048, // can be 1024, 2048, or 4096
        publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
        hash: { name: "SHA-256" }, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      true, // whether the key is extractable (i.e. can be used in exportKey)
      ["encrypt", "decrypt"] // can be any combination of "encrypt" and "decrypt"
    );
    return { publicKey, privateKey };
  } catch (error) {
    return null;
  }
};

export const encryptDataAsync = async (
  data: BufferSource,
  publicKey: CryptoKey
) => {
  try {
    const encryptedData = await crypto.subtle.encrypt(
      {
        name: "RSA-OAEP",
      },
      publicKey, // from generateKey or importKey above
      data // ArrayBuffer of data you want to encrypt
    );

    return encryptedData;
  } catch (error) {
    return null;
  }
};

export const decryptDataAsync = async (
  data: BufferSource,
  privateKey: CryptoKey
) => {
  try {
    const decryptedData = await crypto.subtle.decrypt(
      {
        name: "RSA-OAEP",
      },
      privateKey, // from generateKey or importKey above
      data // ArrayBuffer of the data
    );

    return decryptedData;
  } catch (error) {
    return null;
  }
};

export const exportGeneratedKey = async (privateKey: CryptoKey) => {
  try {
    const exportedKey = await crypto.subtle.exportKey("jwk", privateKey);
    return exportedKey;
  } catch (error) {
    return null;
  }
};

export const importGeneratedKey = async (keyData: JsonWebKey, type: "encrypt" | "decrypt") => {
  try {
    const importedKey = await crypto.subtle.importKey(
      "jwk",
      keyData,
      {
        name: "RSA-OAEP",
        hash: { name: "SHA-256" }, // can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
      },
      false, // whether the key is extractable (i.e. can be used in exportKey)
      [type]
    );
    return importedKey;
  } catch (error) {
    return null;
  }
};

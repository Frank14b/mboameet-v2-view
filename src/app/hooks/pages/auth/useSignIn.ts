import { proceedLogin } from "@/app/services/server-actions";
import useUserStore from "@/app/store/userStore";
import { ApiResponseDto, LoginFormData, ResultLoginDto } from "@/app/types";
import { signInSchema } from "@/app/validators";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { UseFormHandleSubmit } from "react-hook-form";
import useAppForm from "../../useForm";
import { notification } from "@/app/lib/notifications";
import { useMainContext } from "@/app/contexts/main";
import useLocalStorage from "../../useLocalStorage";
import { userEncryptionStorageKey } from "@/app/lib/constants/app";
import useAppEncryption from "../../useEncryption";
import useCustomRouter from "../../useCustomRouter";

function useSignIn(): SignInHookDto {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { getFileUrl } = useMainContext();
  const { set, clear } = useLocalStorage();
  const {
    importPrivateKey,
    generateUserKeys,
    decryptAndDecodeMessageAsync,
    savedKeys,
  } = useAppEncryption();
  const { push } = useCustomRouter();

  const { handleSubmit } = useAppForm({
    schema: signInSchema,
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const [responseData] = useState<ApiResponseDto<ResultLoginDto> | null>(null);
  const { setUserConnected, setUser, setLoading } = useUserStore();

  useEffect(() => {
    generateUserKeys();
  }, [generateUserKeys]);

  const proceedSavePrivateKey = useCallback(
    async (encryptedDataKey: string) => {
      if (encryptedDataKey.length > 0) {
        const cryptoPrivateKey = await importPrivateKey(
          savedKeys.privateKey as JsonWebKey
        );

        if (!cryptoPrivateKey) return;

        const keyParts = encryptedDataKey.split(":public:");
        const privateKeyParts = keyParts?.[0].split("@@");
        const publicKeyParts = keyParts?.[1].split("@@");

        let decryptedJwkPrivateKey = "";
        for (let encryptedString of privateKeyParts) {
          if (encryptedString.length > 0) {
            const data = await decryptAndDecodeMessageAsync(
              encryptedString as string,
              cryptoPrivateKey as CryptoKey
            );

            decryptedJwkPrivateKey += data;
          }
        }

        let decryptedJwkPublicKey = "";
        for (let encryptedString of publicKeyParts) {
          if (encryptedString.length > 0) {
            const data = await decryptAndDecodeMessageAsync(
              encryptedString as string,
              cryptoPrivateKey as CryptoKey
            );

            decryptedJwkPublicKey += data;
          }
        }

        clear();

        set(
          userEncryptionStorageKey,
          JSON.stringify({
            privateKey: decryptedJwkPrivateKey,
            publicKey: decryptedJwkPublicKey,
          })
        );
      }
      return;
    },
    [savedKeys, set, clear, importPrivateKey, decryptAndDecodeMessageAsync]
  );

  const initUserStoreSession = useCallback(
    async (data: ResultLoginDto | null) => {
      setLoading(true);
      setUser({
        ...data,
        photo: getFileUrl(data?.photo, data?.id, data?.userName),
      });
      await proceedSavePrivateKey(`${data?.encryptionKey}`); // import local key to decrypt private key and save in secure local storage
      setUserConnected(true);
    },
    [setUserConnected, setUser, setLoading, getFileUrl, proceedSavePrivateKey]
  );

  const submitFormData = useCallback(
    async (data: LoginFormData) => {
      setIsLoading(true);
      const result = await proceedLogin({
        ...data,
        encryptionKey: btoa(JSON.stringify(savedKeys.publicKey)),
      });

      notification.apiNotify<ResultLoginDto>(result);
      setIsLoading(false);

      if (result.status === true) {
        await initUserStoreSession(result?.data ?? null);
        setTimeout(() => {
          push("/")
        }, 200);
      }
    },
    [savedKeys, push, initUserStoreSession]
  );

  const data: SignInHookDto = {
    isLoading,
    responseData,
    setIsLoading,
    handleSubmit,
    submitFormData,
  };

  return { ...data };
}

export default useSignIn;

export type SignInHookDto = {
  isLoading: boolean;
  submitFormData: any;
  responseData: ApiResponseDto<ResultLoginDto> | null;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  handleSubmit: UseFormHandleSubmit<any>;
};

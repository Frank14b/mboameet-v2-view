import { notification } from "@/app/lib/notifications";
import {
  getAccountSettings,
  proceedUpdateSettings,
} from "@/app/services/server-actions/users/settings";
import {
  AccountSettingProps,
  AccountSettingsFormData,
  ResultAccountSettingDto,
} from "@/app/types";
import { useRouter } from "next/navigation";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const useAccountSettings = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [accountSettings, setAccountSettings] =
    useState<ResultAccountSettingDto | null>(null);
  const router = useRouter();

  const proceedGetSettings = useCallback(async () => {
    const settings = await getAccountSettings();

    if (!settings.status) {
      return notification.apiNotify(settings);
    }
    if (!settings.data) return router.push("/");

    setIsLoading(false);

    setAccountSettings(settings.data);
  }, [router, setIsLoading, setAccountSettings]);

  const updateAccountSettings = useCallback(
    async (data: AccountSettingsFormData) => {
      const updatedSetting = await proceedUpdateSettings(data);
      notification.apiNotify(updatedSetting);

      if (updatedSetting.data) {
        setAccountSettings(updatedSetting.data);
        return;
      }
    },
    [setAccountSettings]
  );

  useEffect(() => {
    proceedGetSettings();
  }, [proceedGetSettings]);

  const settings = useMemo(() => {
    return {
      id: accountSettings?.id,
      isVisible: accountSettings?.isVisible,
      autoApproveMatch: accountSettings?.autoApproveMatch,
      preferredLanguage: accountSettings?.preferredLanguage,
      restrictedCountries: accountSettings?.restrictedCountries,
    };
  }, [accountSettings]);

  const data: AccountSettingHookDto = {
    isLoading,
    settings: settings as AccountSettingProps,
    setIsLoading,
    updateAccountSettings,
  };

  return { ...data };
};

export default useAccountSettings;

export type AccountSettingHookDto = {
  isLoading: boolean;
  settings: AccountSettingProps;
  updateAccountSettings: (data: AccountSettingsFormData) => Promise<void>;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
};

// export type SettingUpdateAction = "visibility"

import { AccountSettingHookDto } from "@/app/hooks/pages/profile/useAccountSettings";
import { profilePathUrl } from "@/app/lib/constants/app";
import {
  EyeIcon,
  PencilIcon,
  CheckCircleIcon,
  FlagIcon,
  PowerIcon,
  TrashIcon,
} from "@heroicons/react/24/solid";
import {
  Card,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Switch,
} from "@material-tailwind/react";
import SelectField from "../../widgets/selectField";
import { useCountries } from "use-react-countries";
import { useMemo } from "react";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { useMainContext } from "@/app/contexts/main";

export default function ProfileSettingsComponent({
  settingsHook,
}: {
  settingsHook: AccountSettingHookDto;
}) {
  //
  const router = useCustomRouter();
  const { settings, updateAccountSettings } = settingsHook;
  const { countries } = useCountries();
  const { logout, deleteAccount } = useMainContext();

  const formattedCountries = useMemo(() => {
    return countries.map((country) => {
      return {
        label: country.name,
        value: country.name,
        image: country.flags.svg,
        customValue: {
          name: country.name,
          callingCode: country.countryCallingCode,
        },
      };
    });
  }, [countries]);

  return (
    <>
      <div className="w-full mt-5">
        <ul>
          <li className="relative gap-2">
            <div className="relative items-center gap-4 py-3 px-5 bg-white dark:bg-black/35 dark:border-0 border shadow-lg rounded-xl border-blue-gray-50 shadow-blue-gray-900/5">
              <div className="w-full">
                <h6 className="font-sans mb-3 text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 dark:text-gray-200">
                  Profile Settings
                </h6>
                <div className="w-full">
                  <Card
                    placeholder={""}
                    className="dark:bg-gray-900 dark:text-gray-100 bg-gray-100 shadow-none"
                  >
                    <List
                      placeholder={""}
                      className="dark:text-gray-400 text-gray-900 text-sm"
                    >
                      <ListItem
                        placeholder={""}
                        onClick={() => router.push(`${profilePathUrl}`)}
                      >
                        <ListItemPrefix placeholder={""}>
                          <PencilIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <span className="dark:text-gray-100">
                          Edit My Profile
                        </span>
                      </ListItem>
                      <ListItem placeholder={""}>
                        <ListItemPrefix placeholder={""}>
                          <EyeIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <div>
                          <span className="dark:text-gray-100">
                            Account Visibility
                          </span>
                          <p className="text-xs dark:text-gray-500">
                            Turn this off to hide your profile to all unmatched
                            users
                          </p>
                        </div>
                        <ListItemSuffix placeholder={""}>
                          <Switch
                            crossOrigin={""}
                            color="green"
                            label=""
                            defaultChecked={settings.isVisible}
                            ripple={true}
                            onChange={(event) =>
                              updateAccountSettings({
                                isVisible: event.target.checked,
                              })
                            }
                          />
                        </ListItemSuffix>
                      </ListItem>
                      <ListItem placeholder={""}>
                        <ListItemPrefix placeholder={""}>
                          <CheckCircleIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <div>
                          <span className="dark:text-gray-100">
                            Auto Approve Match Requests
                          </span>
                          <p className="text-xs dark:text-gray-500">
                            All match requests will be auto approve if this is
                            turn to active
                          </p>
                        </div>
                        <ListItemSuffix placeholder={""}>
                          <Switch
                            crossOrigin={""}
                            color="green"
                            label=""
                            defaultChecked={settings.autoApproveMatch}
                            ripple={true}
                            onChange={(event) =>
                              updateAccountSettings({
                                autoApproveMatch: event.target.checked,
                              })
                            }
                          />
                        </ListItemSuffix>
                      </ListItem>

                      <ListItem placeholder={""}>
                        <ListItemPrefix placeholder={""}>
                          <FlagIcon className="h-5 w-5" />
                        </ListItemPrefix>
                        <div>
                          <span className="dark:text-gray-100">
                            Default Language
                          </span>
                        </div>
                        <ListItemSuffix
                          placeholder={""}
                          className="uppercase font-bold"
                        >
                          {settings.preferredLanguage}
                        </ListItemSuffix>
                      </ListItem>
                      {/* // */}
                    </List>
                    {/* <div className="p-3 px-5">
                      <h6 className="text-sm mb-2 text-gray-900 dark:text-gray-100">
                        Countries Locked
                      </h6>
                      <p className="text-xs dark:text-gray-500">
                        Only users from the selected countries can{`'`}t see
                        your profile
                      </p>
                    </div> */}
                    {/* <div className="">
                      <SelectField
                        data={{
                          title: "Select Country",
                          name: "country",
                          options: formattedCountries,
                        }}
                      />
                    </div> */}

                    <List
                      placeholder={""}
                      className="dark:text-gray-400 text-gray-900 text-sm"
                    >
                      <ListItem
                        placeholder={""}
                        onClick={() => deleteAccount()}
                      >
                        <ListItemPrefix placeholder={""}>
                          <TrashIcon className="h-5 w-5 text-red-700" />
                        </ListItemPrefix>
                        <span className="text-red-700">
                          Delete my account
                        </span>
                      </ListItem>
                      <ListItem placeholder={""} onClick={() => logout()}>
                        <ListItemPrefix placeholder={""}>
                          <PowerIcon className="h-5 w-5 text-red-700" />
                        </ListItemPrefix>
                        <span className="text-red-700">Sign Out</span>
                      </ListItem>
                    </List>
                  </Card>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}

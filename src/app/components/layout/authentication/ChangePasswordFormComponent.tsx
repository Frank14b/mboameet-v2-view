"use client";

import InputField from "../../widgets/InputField";
import { Button } from "@material-tailwind/react";
import { ChangePasswordHookDto } from "@/app/hooks/pages/auth/useChangePassword";
import { useScopedI18n } from "@/app/locales/client";

//
export default function ChangePasswordFormComponent({
  formHook,
}: {
  formHook: ChangePasswordHookDto;
}) {
  const scopedT = useScopedI18n("authentication.changePassword");

  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <div className="space-y-12">
          <div className="border-0 border-gray-900/10 pb-4">
            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">
              <InputField
                data={{
                  title: scopedT("form.password"),
                  name: "password",
                  type: "password",
                }}
              />

              <InputField
                data={{
                  title: scopedT("form.confirm_password"),
                  name: "confirmPassword",
                  type: "password",
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-5 flex items-center justify-end gap-x-6 mb-4">
          <Button
            type="submit"
            placeholder={""}
            color="pink"
            className="w-full bg-pink-300"
          >
            {scopedT("form.confirm_btn")}
          </Button>
        </div>
      </div>
    </>
  );
}

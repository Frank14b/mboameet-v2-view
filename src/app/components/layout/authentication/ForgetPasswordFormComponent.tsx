"use client";

import { Button } from "@material-tailwind/react";
import InputField from "../../widgets/InputField";
import { ForgetPasswordHookDto } from "@/app/hooks/pages/auth/useForgetPassword";
import { useScopedI18n } from "@/app/locales/client";

export default function ForgetPasswordFormComponent({
  formHook,
}: {
  formHook: ForgetPasswordHookDto;
}) {
  const { responseData } = formHook;
  const scopedT = useScopedI18n("authentication.forgetPassword");

  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <div className="space-y-12">
          <div className="border-0 border-gray-900/10 pb-4">
            <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3">
              <InputField
                data={{ title: scopedT("form.email"), name: "email" }}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-x-6 mb-4">
          <Button
            type="submit"
            placeholder={""}
            color="pink"
            className="w-full bg-pink-300"
          >
            {scopedT("form.confirm_btn")}
          </Button>
        </div>

        {responseData?.status === false && (
          <span className="text-red-500">{responseData?.message}</span>
        )}

        {responseData?.status === true && (
          <span className="text-green-500">{responseData?.data?.message}</span>
        )}
      </div>
    </>
  );
}

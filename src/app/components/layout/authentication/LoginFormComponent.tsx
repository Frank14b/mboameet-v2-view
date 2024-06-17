"use client";

import InputField from "../../widgets/InputField";
import { Button } from "@material-tailwind/react";
import { SignInHookDto } from "@/app/hooks/pages/auth/useSignIn";
import CheckboxField from "../../widgets/CheckboxField";
import { useScopedI18n } from "@/app/locales/client";

export default function LoginFormComponent({
  signInHook,
}: {
  signInHook: SignInHookDto;
}) {
  //
  const { responseData } = signInHook;
  const scopedT = useScopedI18n("authentication.signIn");

  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <div className="relative w-full min-w-[200px]">
          <InputField
            data={{ title: scopedT("form.username"), name: "userName" }}
          />
        </div>
        <div className="relative w-full min-w-[200px]">
          <InputField
            data={{ title: scopedT("form.password"), type: "password", name: "password" }}
          />
        </div>
        <div className="-ml-2.5">
          <div className="inline-flex items-center">
            <CheckboxField
              data={{ title: scopedT("form.remember_me"), name: "rememberMe" }}
            />
          </div>
        </div>
      </div>
      <div className="p-6 pt-0">
        <Button
          type="submit"
          placeholder={""}
          color="blue"
          className="w-full bg-pink-300"
        >
          {scopedT("form.confirm_btn")}
        </Button>

        <p className="mt-3">
          {responseData?.status === false && (
            <span className="text-red-500 mt-5">{responseData?.message}</span>
          )}
        </p>
      </div>
    </>
  );
}

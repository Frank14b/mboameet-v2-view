"use client";

import InputField from "../../widgets/inputField";
import Link from "next/link";
import { Button } from "@material-tailwind/react";
import { SignInHookDto } from "@/app/hooks/pages/auth/useSignIn";
import CheckboxField from "../../widgets/checkboxField";
import AnimateFadeOut from "../../widgets/motions/animateFadeOut";

export default function LoginFormComponent({
  signInHook,
}: {
  signInHook: SignInHookDto;
}) {
  //
  const { responseData } = signInHook;

  return (
    <>
      <div className="flex flex-col gap-4 p-6">
        <div className="relative w-full min-w-[200px]">
          <AnimateFadeOut speed={0.8}>
            <InputField data={{ title: "Username", name: "userName" }} />
          </AnimateFadeOut>
        </div>
        <div className="relative w-full min-w-[200px]">
          <AnimateFadeOut speed={1}>
            <InputField data={{ title: "Password", type: "password" }} />
          </AnimateFadeOut>
        </div>
        <div className="-ml-2.5">
          <div className="inline-flex items-center">
            <CheckboxField
              data={{ title: "Remember me", name: "rememberMe" }}
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
          Proceed
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

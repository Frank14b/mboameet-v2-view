"use client";

import { Button } from "@material-tailwind/react";
import InputField from "../../widgets/inputField";
import { ForgetPasswordHookDto } from "@/app/hooks/pages/auth/forgetPassword";

export default function ForgetPasswordFormComponent({
  formHook,
}: {
  formHook: ForgetPasswordHookDto;
}) {
  const { responseData } = formHook;

  return (
    <>
      <div className="space-y-12">
        <div className="border-0 border-gray-900/10 pb-4">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">
            <InputField data={{ title: "Email" }} />
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center justify-end gap-x-6 mb-4">
        <Button
          type="submit"
          placeholder={""}
          color="blue"
          className="w-full bg-indigo-600"
        >
          Proceed
        </Button>
      </div>

      {responseData?.status === false && (
        <span className="text-red-500 mt-5">{responseData?.message}</span>
      )}

      {responseData?.status === true && (
        <span className="text-green-500 mt-5">
          {responseData?.data?.message}
        </span>
      )}
    </>
  );
}

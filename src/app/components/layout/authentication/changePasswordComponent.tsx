"use client";

import LoadingSpinner from "../../widgets/LoadingSpinner";
import Link from "next/link";
import ChangePasswordFormComponent from "./ChangePasswordFormComponent";
import useChangePassword from "@/app/hooks/pages/auth/useChangePassword";
import { useEffect } from "react";
import AnimateFadeOut from "../../widgets/motions/AnimateFadeOut";
import CustomNextImage from "../../widgets/CustomNextImage";

export default function ChangePasswordComponent({ token }: { token: string }) {
  //
  const formHook = useChangePassword();
  const { isLoading, setToken, handleSubmit, submitFormData } = formHook;

  useEffect(() => {
    setToken(token);
  }, [token, setToken]);

  return (
    <>
      {/* // */}
      <div className="flex">
        <div className="w-1/2 bg-pink-300">
          <div className="flex flex-col items-center justify-end">
            <div className="w-full">
              <div className="flex flex-col items-center">
                <CustomNextImage
                  alt=""
                  width={2000}
                  height={2000}
                  src="/full-shot-people-use-apps-make-friends.jpg"
                  className="h-screen object-cover w-full relative"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-full bg-gray-200 dark:bg-gray-800">
          <AnimateFadeOut>
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-900 shadow-md w-96 rounded-xl bg-clip-border">
                <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-pink-300 from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                  <h3 className="block font-sans text-2xl antialiased font-semibold leading-snug tracking-normal text-white">
                    Change Account Password
                  </h3>
                </div>
                <LoadingSpinner isLoading={isLoading}>
                  <form method="post" onSubmit={handleSubmit(submitFormData)}>
                    <ChangePasswordFormComponent formHook={formHook} />
                  </form>
                </LoadingSpinner>

                <p className="flex justify-center mb-3 font-sans text-sm antialiased font-light leading-normal text-inherit">
                  {`Recovered your password?`}
                  <Link
                    href="/auth/signin"
                    className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 dark:text-gray-500"
                  >
                    Sign in
                  </Link>
                </p>
                <p className="flex justify-center mb-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                  {`Don't have account?`}
                  <Link
                    href="/auth/signup"
                    className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 dark:text-gray-500"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
            </div>
          </AnimateFadeOut>
        </div>
        {/* // */}
      </div>
    </>
  );
}

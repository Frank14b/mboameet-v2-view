"use client";

import LoadingSpinner from "../../widgets/LoadingSpinner";
import { SignInHookDto } from "@/app/hooks/pages/auth/useSignIn";
import LoginFormComponent from "./LoginFormComponent";
import CustomNextLink from "../../widgets/CustomNextLink";
import CustomNextImage from "../../widgets/CustomNextImage";
import { useScopedI18n } from "@/app/locales/client";

export default function LoginComponent({
  signInHook,
}: {
  signInHook: SignInHookDto;
}) {
  //
  const { handleSubmit, isLoading, submitFormData } = signInHook;
  const scopedT = useScopedI18n("authentication.signIn");

  return (
    <>
      <div className="flex">
        <div className="w-1/2 xs:w-full sm:w-full lg:w-1/2 bg-gray-200 dark:bg-gray-800">
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-900 shadow-md w-96 rounded-xl bg-clip-border">
              <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-pink-300 from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                  {scopedT("title")}
                </h3>
              </div>
              <LoadingSpinner isLoading={isLoading}>
                <form method="post" onSubmit={handleSubmit(submitFormData)}>
                  <LoginFormComponent signInHook={signInHook} />
                </form>
              </LoadingSpinner>

              <p className="flex justify-center mb-3 font-sans text-sm antialiased font-light leading-normal text-inherit">
                {`Don't have an account?`}
                <CustomNextLink
                  href="/auth/signup"
                  className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 dark:text-gray-500"
                >
                  {scopedT("sign_up")}
                </CustomNextLink>
              </p>
              <p className="flex justify-center mb-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                <CustomNextLink
                  href="/auth/forget-password"
                  className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 dark:text-gray-500"
                >
                  {scopedT("rest_password_here")}
                </CustomNextLink>
              </p>
            </div>
          </div>
        </div>

        <div className="w-1/2 xs:hidden bg-transparent">
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
      </div>
    </>
  );
}

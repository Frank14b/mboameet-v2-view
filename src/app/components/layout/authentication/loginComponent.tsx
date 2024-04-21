"use client";

import LoadingSpinner from "../../widgets/loadingSpinner";
import useSignIn from "@/app/hooks/pages/auth/signIn";
import LoginFormComponent from "./loginFormComponent";
import AnimateFadeOut from "../../widgets/motions/animateFadeOut";

export default function LoginComponent() {
  //
  const signInHook = useSignIn();
  const { handleSubmit, isLoading, submitFormData } = signInHook;

  return (
    <>
      <div className="flex">
        <div className="w-1/2 bg-gray-200 dark:bg-gray-800">
          <AnimateFadeOut>
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-900 shadow-md w-96 rounded-xl bg-clip-border">
                <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-pink-300 from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                  <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                    Sign In
                  </h3>
                </div>
                <LoadingSpinner isLoading={isLoading}>
                  <form method="post" onSubmit={handleSubmit(submitFormData)}>
                    <LoginFormComponent signInHook={signInHook} />
                  </form>
                </LoadingSpinner>
              </div>
            </div>
          </AnimateFadeOut>
        </div>

        <div className="w-1/2 bg-pink-300">
          <div className="flex flex-col items-center justify-end">
            <div className="w-full">
              <div className="flex flex-col items-center">
                <img
                  src="../full-shot-people-use-apps-make-friends.jpg"
                  className="h-screen object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

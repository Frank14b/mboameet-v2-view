"use client";

import LoadingSpinnerComponent from "../../widgets/loadingSpinner";
import useSignUp from "@/app/hooks/pages/auth/signUp";
import Link from "next/link";
import SignUpFormComponent from "./registerFormComponent";
import AnimateFadeOut from "../../widgets/motions/animateFadeOut";

export default function SignInComponent() {
  //
  const signInHook = useSignUp();
  const { handleSubmit, submitFormData, isLoading } = signInHook;

  return (
    <>
      <div className="flex">
        <div className="w-1/2 bg-pink-300">
          <div className="flex flex-col items-center justify-end">
            <div className="w-full">
              <div className="flex flex-col items-center">
                <img
                  src="../communication-social-media-icons-smartphone-device.jpg"
                  className="h-screen object-cover w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="w-1/2 bg-gray-200 dark:bg-gray-800">
          <AnimateFadeOut>
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-900 dark:border-1 dark:shadow-xs shadow-md w-96 rounded-xl bg-clip-border">
                <div className="relative grid mx-4 mb-0 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-pink-300 from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                  <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                    Sign Up
                  </h3>
                </div>
                {/* <p className="text-sm text-gray-600 mt-4 px-5 text-center">
                  Fill the required fields bellow or use the social button below
                </p> */}
                <div className="p-5">
                  <LoadingSpinnerComponent isLoading={isLoading}>
                    <form method="post" onSubmit={handleSubmit(submitFormData)}>
                      <SignUpFormComponent signUpFormProps={signInHook} />

                      <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                        Already have an account?
                        <Link
                          href="/auth/signin"
                          className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 dark:text-gray-500"
                        >
                          Sign In
                        </Link>
                      </p>
                    </form>
                  </LoadingSpinnerComponent>
                </div>
              </div>
            </div>
          </AnimateFadeOut>
        </div>
      </div>
    </>
  );
}

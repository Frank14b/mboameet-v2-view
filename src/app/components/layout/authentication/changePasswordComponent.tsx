"use client";

import { UserCircleIcon } from "@heroicons/react/24/outline";
import LoadingSpinner from "../../widgets/loadingSpinner";
import Link from "next/link";
import ChangePasswordFormComponent from "./changePasswordFormComponent";
import useChangePassword from "@/app/hooks/pages/auth/changePassword";
import { useEffect } from "react";

export default function ChangePasswordComponent({ token }: { token: string }) {
  //
  const formHook = useChangePassword();
  const { isLoading, setToken, handleSubmit, submitFormData } = formHook;

  useEffect(() => {
    setToken(token);
  }, []);

  return (
    <>
      <div className="bg-white px-4 pb-1 pt-5 sm:p-6 sm:pb-4">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
            <UserCircleIcon
              className="h-6 w-6 text-blue-600"
              aria-hidden="true"
            />
          </div>
          <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
            <h3 className="text-base font-semibold leading-6 text-gray-900">
              Change Account Password
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Fill the required fields bellow or use the social button below
              </p>
            </div>
          </div>
        </div>

        <div className="px-1 relative">
          <div>
            <LoadingSpinner isLoading={isLoading}>
              <form method="post" onSubmit={handleSubmit(submitFormData)}>
                <ChangePasswordFormComponent formHook={formHook} />
              </form>
            </LoadingSpinner>

            <div className="mt-3 flex items-center text-center justify-end gap-x-2 mb-4">
              Don't have account yet ?
              <Link href="/" className="text-indigo-600 font-bold text-sm">
                Register now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

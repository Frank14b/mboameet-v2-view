"use client";

import { Button } from "@material-tailwind/react";
import Link from "next/link";
import InputField from "../../widgets/inputField";
import useVerifyAuthToken from "@/app/hooks/pages/auth/useVerifyAuthToken";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import AnimateFadeOut from "../../widgets/motions/animateFadeOut";
import LoadingSpinner from "../../widgets/loadingSpinner";
import TimerCounter, { TimeDifference } from "../../commons/timerCounter";
import { OTP_TIMER } from "@/app/lib/constants/app";
//
export default function VerifyAuthTokenComponent({
  token,
  otp,
}: {
  token: string;
  otp?: number;
}) {
  const {
    isLoading,
    responseData,
    resendTimer,
    handleSubmit,
    submitFormData,
    setToken,
    setOtp,
    resendOtpCode,
    toggleResendTimer,
  } = useVerifyAuthToken();

  useEffect(() => {
    setToken(token);
    otp && setOtp(otp);
    //
  }, [token, otp, setToken, setOtp]);

  const [timer, setTimer] = useState<TimeDifference | null>(null);

  const timeDifference = useCallback(
    (data: TimeDifference | null) => {
      if (!data) {
        toggleResendTimer(false);
      }
      setTimer(data);
    },
    [setTimer, toggleResendTimer]
  );

  return (
    <>
      {/* // */}
      <div className="flex">
        <div className="w-full bg-gray-200 dark:bg-gray-800">
          <AnimateFadeOut>
            <div className="flex flex-col items-center justify-center h-screen">
              <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-900 shadow-md w-96 rounded-xl bg-clip-border">
                <div className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-pink-300 from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                  <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                    <h3 className="block font-sans text-md antialiased font-semibold leading-snug tracking-normal text-white">
                      2 Step Verification
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-white">
                        Proceed with the otp code verification.
                      </p>
                    </div>
                  </div>
                </div>
                <LoadingSpinner isLoading={isLoading}>
                  <form method="post" onSubmit={handleSubmit(submitFormData)}>
                    <div className="flex flex-col gap-4 p-6">
                      <div className="space-y-12">
                        <div className="border-0 border-gray-900/10 pb-4">
                          <div className="mt-5 grid grid-cols-1 gap-x-6 gap-y-3">
                            <InputField
                              data={{ title: "OTP code", name: "otp" }}
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
                          Proceed
                        </Button>
                      </div>

                      {responseData?.status === false && (
                        <span className="text-red-500 text-center">
                          {responseData?.message}
                        </span>
                      )}
                    </div>
                  </form>
                </LoadingSpinner>

                <p className="flex justify-center mb-3 font-sans text-sm antialiased font-light leading-normal text-inherit">
                  {`Recovered your password?`}
                  <Link
                    href="/auth/signin"
                    className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 dark:text-gray-500"
                  >
                    Back to sign in
                  </Link>
                </p>
                <TimerCounter
                  options={{
                    duration: OTP_TIMER,
                    format: "seconds",
                    start: resendTimer,
                    onTick: timeDifference,
                  }}
                >
                  <p className="flex justify-center mb-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                    {`Didn't received otp?`}&nbsp;
                    {timer ? (
                      <>
                        <span className="font-sans">{timer.ss} s</span>
                      </>
                    ) : (
                      <>
                        <a
                          onClick={resendOtpCode}
                          href="#"
                          className="font-sans"
                        >
                          Resend
                        </a>
                      </>
                    )}
                  </p>
                </TimerCounter>
              </div>
            </div>
          </AnimateFadeOut>
        </div>

        <div className="w-1/2 bg-pink-300">
          <div className="flex flex-col items-center justify-end">
            <div className="w-full">
              <div className="flex flex-col items-center">
                <Image
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

"use client";

import { useCallback, useEffect, useState } from "react";
import { Button } from "@material-tailwind/react";
import InputField from "../../widgets/InputField";
import useVerifyAuthToken from "@/app/hooks/pages/auth/useVerifyAuthToken";
import AnimateFadeOut from "../../widgets/motions/AnimateFadeOut";
import LoadingSpinner from "../../widgets/LoadingSpinner";
import TimerCounter, { TimeDifference } from "../../commons/TimerCounter";
import { OTP_TIMER } from "@/app/lib/constants/app";
import CustomNextLink from "../../widgets/CustomNextLink";
import CustomNextImage from "../../widgets/CustomNextImage";
import { useScopedI18n } from "@/app/locales/client";
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

  const scopedT = useScopedI18n("authentication.twoStepToken");

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
                      {scopedT("title")}
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-white">
                        {scopedT("subtitle")}
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
                              data={{ title: scopedT("form.otp_code"), name: "otp" }}
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
                          {scopedT("proceed_btn")}
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
                  <CustomNextLink
                    href="/auth/signin"
                    className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900 dark:text-gray-500"
                  >
                    {scopedT("back_to_signin")}
                  </CustomNextLink>
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
                    {scopedT("did_not_received_otp")}&nbsp;
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
                          {scopedT("resend")}
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

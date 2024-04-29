"use client";

import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";
import SignUpStepOneComponent from "./sign-up-stepper/stepOneComponent";
import SignUpStepTwoComponent from "./sign-up-stepper/stepTwoComponent";
import SignUpStepThreeComponent from "./sign-up-stepper/stepThreeComponent";
import SignUpStepFourComponent from "./sign-up-stepper/stepFourComponent";

export default function SignUpFormComponent({
  signUpFormProps,
}: {
  signUpFormProps: SignUpHookDto;
}) {
  const { responseData } = signUpFormProps;

  return (
    <>
      <div className="space-y-12">
        <div className="border-0 border-gray-900/10 pb-4">
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">

            <SignUpStepOneComponent stepProps={signUpFormProps} />
            
            <SignUpStepTwoComponent stepProps={signUpFormProps} />

            <SignUpStepThreeComponent stepProps={signUpFormProps} />

            <SignUpStepFourComponent stepProps={signUpFormProps} />

          </div>
        </div>
      </div>

      {responseData?.status === false && (
        <span className="text-red-500 mt-5">{responseData?.message}</span>
      )}
    </>
  );
}

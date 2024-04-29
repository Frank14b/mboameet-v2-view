import InputField from "@/app/components/widgets/inputField";
import AnimateFadeOut from "@/app/components/widgets/motions/animateFadeOut";
import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";

export default function SignUpStepThreeComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper, switchbackStepper } = stepProps;

  return (
    <>
      {stepper == 3 && (
        <div
          className={`mt-1 grid grid-cols-1 gap-x-6 ${
            stepper !== 3 && "hidden"
          }`}
        >
          <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">
            Account Security
          </h3>
          <div className="grid gap-4 mb-4 grid-cols-1">
            <AnimateFadeOut>
              <InputField
                data={{ title: "Password", type: "password" }}
              />
            </AnimateFadeOut>
            <AnimateFadeOut speed={1}>
              <InputField
                data={{
                  title: "Confirm Password",
                  type: "password",
                  name: "confirmPassword",
                }}
              />
            </AnimateFadeOut>
          </div>
          <div className="flex justify-between mt-5">
            <button
              onClick={switchbackStepper}
              type="button"
              className="rounded-md border bg-white-600 w-1/2 px-3 py-2 text-sm font-semibold text-pink-300 hover:text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Back
            </button>
            <button
              type="submit"
              className="rounded-md bg-pink-300 w-1/2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Proceed
            </button>
          </div>
        </div>
      )}
    </>
  );
}

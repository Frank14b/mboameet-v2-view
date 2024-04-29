import InputField from "@/app/components/widgets/inputField";
import AnimateFadeOut from "@/app/components/widgets/motions/animateFadeOut";
import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";

export default function SignUpStepOneComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper } = stepProps;

  return (
    <>
      {stepper == 1 && (
        <div
          className={`mt-1 grid grid-cols-1 gap-x-6 ${
            stepper !== 1 && "hidden"
          }`}
        >
          <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">
            Account Identity
          </h3>
          <div className="grid gap-4 mb-4 grid-cols-1">
            <AnimateFadeOut speed={0.8}>
              <InputField
                data={{ title: "How can we call you?", name: "userName" }}
              />
            </AnimateFadeOut>
            <AnimateFadeOut speed={1}>
              <InputField
                data={{
                  title: "What's your email address?",
                  name: "email",
                  type: "email",
                }}
              />
            </AnimateFadeOut>
          </div>
          <button
            type="submit"
            className="rounded-md bg-pink-300 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Next Step: Personal Details
          </button>
        </div>
      )}
    </>
  );
}

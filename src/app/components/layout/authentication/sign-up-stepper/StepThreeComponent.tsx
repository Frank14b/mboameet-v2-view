import InputField from "@/app/components/widgets/InputField";
import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";
import { useScopedI18n } from "@/app/locales/client";

export default function SignUpStepThreeComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper } = stepProps;
  const scopedT = useScopedI18n("authentication.signUp");

  return (
    <>
      {stepper == 3 && (
        <div
          className={`mt-1 grid grid-cols-1 gap-x-6 ${
            stepper !== 3 && "hidden"
          }`}
        >
          <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">
            {scopedT("form.step_three.title")}
          </h3>
          <div className="grid gap-4 mb-4 grid-cols-1">
            <InputField
              data={{
                title: scopedT("form.step_three.password"),
                type: "password",
              }}
            />
            <InputField
              data={{
                title: scopedT("form.step_three.confirm_password"),
                type: "password",
                name: "confirmPassword",
              }}
            />
          </div>
          <div className="flex justify-between mt-5 gap-5">
            <button
              type="submit"
              className="rounded-md bg-pink-300 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              {scopedT("form.step_three.confirm_btn")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

import InputField from "@/app/components/widgets/InputField";
import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";
import { useScopedI18n } from "@/app/locales/client";

export default function SignUpStepOneComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper } = stepProps;
  const scopedT = useScopedI18n("authentication.signUp");

  return (
    <>
      {stepper == 1 && (
        <div
          className={`mt-1 grid grid-cols-1 gap-x-6 ${
            stepper !== 1 && "hidden"
          }`}
        >
          <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">
            {scopedT("form.step_one.title")}
          </h3>
          <div className="grid gap-4 mb-4 grid-cols-1">
            <InputField
              data={{
                title: scopedT("form.step_one.user_name"),
                name: "userName",
              }}
            />
            <InputField
              data={{
                title: scopedT("form.step_one.user_email"),
                name: "email",
                type: "email",
              }}
            />
          </div>
          <button
            type="submit"
            className="rounded-md bg-pink-300 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            {scopedT("form.step_one.confirm_btn")}
          </button>
        </div>
      )}
    </>
  );
}

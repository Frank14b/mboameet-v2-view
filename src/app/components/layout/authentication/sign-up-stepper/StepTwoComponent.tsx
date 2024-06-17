import CountrySelectField from "@/app/components/widgets/CountrySelectField";
import InputField from "@/app/components/widgets/InputField";
import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";
import { useScopedI18n } from "@/app/locales/client";

export default function SignUpStepTwoComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper } = stepProps;
  const scopedT = useScopedI18n("authentication.signUp");

  return (
    <>
      {stepper == 2 && (
        <>
          <div
            className={`mt-1 grid grid-cols-1 gap-x-6 ${
              stepper !== 2 && "hidden"
            }`}
          >
            <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">
              {scopedT("form.step_two.title")}
            </h3>
            <div className="grid gap-4 mb-4 grid-cols-1">
              <CountrySelectField
                data={{
                  title: scopedT("form.step_two.country_select"),
                  name: "country",
                }}
              />
              <InputField
                data={{
                  title: scopedT("form.step_two.phone_number"),
                  name: "phone",
                }}
              />
            </div>
            <div className="flex justify-between mt-5 gap-5">
              <button
                type="submit"
                className="rounded-md bg-pink-300 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {scopedT("form.step_two.confirm_btn")}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

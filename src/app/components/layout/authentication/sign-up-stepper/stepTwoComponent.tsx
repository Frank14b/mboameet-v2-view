import InputField from "@/app/components/widgets/inputField";
import AnimateFadeOut from "@/app/components/widgets/motions/animateFadeOut";
import SelectField from "@/app/components/widgets/selectField";
import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";
import { useMemo } from "react";
import { useCountries } from 'use-react-countries'

export default function SignUpStepTwoComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper, switchbackStepper } = stepProps;
  const { countries } = useCountries();

  const formattedCountries = useMemo(() => {
    return countries.map((country) => {
      return {
        label: country.name,
        value: country.name,
        image: country.flags.svg,
        customValue: {
          name: country.name,
          callingCode: country.countryCallingCode,
        }
      };
    });
  }, [countries])

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
              {`What's your mobile number?`}
            </h3>
            <div className="grid gap-4 mb-4 grid-cols-1">
              <AnimateFadeOut speed={0.8}>
                <SelectField data={{ title: "Select Country", name: "country", options: formattedCountries }} />
              </AnimateFadeOut>
              <AnimateFadeOut speed={0.8}>
                <InputField data={{ title: "Phone Number", name: "phone" }} />
              </AnimateFadeOut>
            </div>
            <div className="flex justify-between mt-5">
              <button
                onClick={switchbackStepper}
                type="button"
                className="rounded-md border bg-white-600 w-1/2 px-3 py-2 text-sm font-semibold text-pink-300 hover:text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Back: Identity
              </button>
              <button
                type="submit"
                className="rounded-md bg-pink-300 w-1/2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Next step: Security
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}

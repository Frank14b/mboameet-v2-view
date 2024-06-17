import { SignUpHookDto } from "@/app/hooks/pages/auth/useSignUp";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { useScopedI18n } from "@/app/locales/client";
import { Button } from "@material-tailwind/react";

export default function SignUpStepFourComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper, responseData } = stepProps;
  const { push } = useCustomRouter();
  const scopedT = useScopedI18n("authentication.signUp");

  return (
    <>
      <div
        className={`mt-10 grid grid-cols-1 gap-x-6 text-center ${
          stepper !== 4 && "hidden"
        }`}
      >
        <h3 className="mb-4 text-md font-medium font-bold leading-none text-green-600 dark:text-green-800">
          {scopedT("form.step_four.title")}
        </h3>
        <div className="grid gap-4 mb-4 sm:grid-cols-1 bg-gray-100 p-3 rounded-md border">
          <div>
            <h3>
              {scopedT("form.step_four.subtitle", {
                name: responseData?.data?.email,
              })}
            </h3>
            <p>{scopedT("form.step_four.subtitle2")}</p>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <Button
            onClick={() => push("/auth/signin")}
            type="button"
            placeholder={""}
            color="pink"
            className="w-full bg-pink-300"
          >
            {scopedT("form.step_four.go_to_sign_in")}
          </Button>
        </div>
      </div>
    </>
  );
}

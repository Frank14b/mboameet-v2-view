import { SignUpHookDto } from "@/app/hooks/pages/auth/signUp";
import { Button } from "@material-tailwind/react";
import { useRouter } from "next/navigation";

export default function SignUpStepFourComponent({
  stepProps,
}: {
  stepProps: SignUpHookDto;
}) {
  //
  const { stepper, responseData } = stepProps;
  const router = useRouter();

  return (
    <>
      <div
        className={`mt-10 grid grid-cols-1 gap-x-6 text-center ${
          stepper !== 4 && "hidden"
        }`}
      >
        <h3 className="mb-4 text-md font-medium font-bold leading-none text-green-600 dark:text-green-800">
          Congratulations
        </h3>
        <div className="grid gap-4 mb-4 sm:grid-cols-1 bg-gray-100 p-3 rounded-md border">
          <div>
            <h3>
              Your account <b>{responseData?.data?.email}</b> has been created
              successfully
            </h3>
            <p>Check your email address to activate your account</p>
          </div>
        </div>
        <div className="flex justify-between mt-5">
          <Button
            onClick={() => router.push("/auth/signin")}
            type="button"
            placeholder={""}
            color="pink"
            className="w-full bg-pink-300"
          >
            Go to sign-in
          </Button>
        </div>
      </div>
    </>
  );
}

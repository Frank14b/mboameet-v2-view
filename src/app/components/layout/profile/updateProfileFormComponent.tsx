import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import InputField from "../../widgets/inputField";
import LoadingSpinnerComponent from "../../widgets/loadingSpinner";
import { ProfileHookDto } from "@/app/hooks/pages/profile/useUserProfile";

export function UpdateProfileFormComponent({
  userProfileHook,
}: {
  userProfileHook: ProfileHookDto;
}) {
  const {
    isLoading,
    openEditProfile,
    responseData,
    handleSubmit,
    handleOpenEditProfile,
    submitFormData,
  } = userProfileHook;

  return (
    <>
      <Dialog
        placeholder={""}
        size="md"
        open={openEditProfile}
        handler={handleOpenEditProfile}
        className="bg-transparent shadow-none"
      >
        <Card
          placeholder={""}
          className="mx-auto w-full max-w-[24rem] dark:bg-dark-600"
        >
          <LoadingSpinnerComponent isLoading={isLoading}>
            <form method="post" onSubmit={handleSubmit(submitFormData)}>
              <CardBody placeholder={""} className="flex flex-col gap-4">
                <Typography placeholder={""} variant="h4" color="blue-gray">
                  Edit Profile
                </Typography>
                <Typography
                  placeholder={""}
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  Enter your email and password to Sign In.
                </Typography>

                {/* <InputField data={{ title: "Username", name: "userName" }} /> */}

                <InputField
                  data={{
                    title: "First Name",
                    name: "firstName",
                  }}
                />

                <InputField
                  data={{
                    title: "Last Name",
                    name: "lastName",
                  }}
                />

                <InputField
                  data={{
                    title: "Email",
                  }}
                />

                <InputField data={{ title: "Password", type: "password" }} />
              </CardBody>
              <CardFooter placeholder={""} className="pt-0">
                <Button
                  type="submit"
                  placeholder={""}
                  variant="gradient"
                  fullWidth
                  className="dark-pink-600"
                >
                  Save
                </Button>

                <p className="mt-3">
                  {responseData?.status === false && (
                    <span className="text-red-500 mt-5">
                      {responseData?.message}
                    </span>
                  )}
                </p>
              </CardFooter>
            </form>
          </LoadingSpinnerComponent>
        </Card>
      </Dialog>
    </>
  );
}

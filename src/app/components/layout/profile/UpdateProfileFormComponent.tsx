import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import InputField from "../../widgets/InputField";
import { ProfileHookDto } from "@/app/hooks/pages/profile/useUserProfile";
import LoadingSpinner from "../../widgets/LoadingSpinner";
import { useScopedI18n } from "@/app/locales/client";

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

  const scopedT = useScopedI18n("profile.edit_form");

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
          <LoadingSpinner isLoading={isLoading}>
            <form method="post" onSubmit={handleSubmit(submitFormData)}>
              <CardBody placeholder={""} className="flex flex-col gap-4">
                <Typography placeholder={""} variant="h4" color="blue-gray">
                  {scopedT("title")}
                </Typography>
                <Typography
                  placeholder={""}
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  {scopedT("subtitle")}
                </Typography>

                {/* <InputField data={{ title: "Username", name: "userName" }} /> */}

                <InputField
                  data={{
                    title: scopedT("firstName"),
                    name: "firstName",
                  }}
                />

                <InputField
                  data={{
                    title: scopedT("lastName"),
                    name: "lastName",
                  }}
                />

                <InputField
                  data={{
                    title: scopedT("email"),
                    name: "email",
                  }}
                />

                <InputField
                  data={{
                    title: scopedT("password"),
                    name: "password",
                    type: "password",
                  }}
                />
              </CardBody>
              <CardFooter placeholder={""} className="pt-0">
                <Button
                  type="submit"
                  placeholder={""}
                  variant="gradient"
                  fullWidth
                  className="dark-pink-600"
                >
                  {scopedT("save_btn")}
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
          </LoadingSpinner>
        </Card>
      </Dialog>
    </>
  );
}

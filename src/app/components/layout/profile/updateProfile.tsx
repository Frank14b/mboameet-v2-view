import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { useProfileContext } from "@/app/(pages)/profile/template";
import InputFormComponent from "../../widgets/inputForm";
import { useMainContext } from "@/app/contexts/main";
import LoadingSpinnerComponent from "../../commons/loadingSpinner";
export function UpdateProfileFormComponent() {
  const profileContext = useProfileContext();
  const mainContext = useMainContext();

  return (
    <>
      <Card
        placeholder={""}
        className="mx-auto w-full max-w-[24rem] dark:bg-dark-600"
      >
        <LoadingSpinnerComponent isLoading={profileContext.isLoading}>
          <form
            method="post"
            onSubmit={profileContext.handleSubmit(profileContext.editProfile)}
          >
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

              {/* <InputFormComponent data={{ title: "Username", id: "userName", defaultValue: mainContext.connectedUser.userName }} register={profileContext.register} error={profileContext.errors?.userName} /> */}

              <InputFormComponent
                data={{
                  title: "Firstname",
                  defaultValue: mainContext.connectedUser?.firstName,
                }}
                register={profileContext.register}
                error={profileContext.errors?.firstName}
              />

              <InputFormComponent
                data={{
                  title: "Lastname",
                  defaultValue: mainContext.connectedUser?.lastName,
                }}
                register={profileContext.register}
                error={profileContext.errors?.lastName}
              />

              <InputFormComponent
                data={{
                  title: "Email",
                  defaultValue: mainContext.connectedUser?.email,
                }}
                register={profileContext.register}
                error={profileContext.errors?.email}
              />

              <InputFormComponent
                data={{ title: "Password", type: "password" }}
                register={profileContext.register}
                error={profileContext.errors?.password}
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
                Save
              </Button>

              <p className="mt-3">
                {profileContext.requestData?.status === false && (
                  <span className="text-red-500 mt-5">
                    {profileContext.requestData?.message}
                  </span>
                )}
              </p>
            </CardFooter>
          </form>
        </LoadingSpinnerComponent>
      </Card>
    </>
  );
}

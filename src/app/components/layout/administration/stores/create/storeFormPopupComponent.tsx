import React from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
} from "@material-tailwind/react";
import InputField from "@/app/components/widgets/inputField";
import LoadingSpinner from "@/app/components/widgets/loadingSpinner";
import { AdminStoreHookDto } from "@/app/hooks/pages/administration/stores/useAdminStore";

export function CreateStoreFormPopupComponent({
  adminStoreHook,
}: {
  adminStoreHook: AdminStoreHookDto;
}) {
  const {
    isLoading,
    isOpenStoreForm,
    responseData,
    handleSubmit,
    handleIsOpenStoreForm,
    submitFormData,
  } = adminStoreHook;

  return (
    <>
      <Dialog
        placeholder={""}
        size="md"
        open={isOpenStoreForm}
        handler={handleIsOpenStoreForm}
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
                  Store
                </Typography>
                <Typography
                  placeholder={""}
                  className="mb-3 font-normal"
                  variant="paragraph"
                  color="gray"
                >
                  Fill the form to create a new store
                </Typography>

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
          </LoadingSpinner>
        </Card>
      </Dialog>
    </>
  );
}

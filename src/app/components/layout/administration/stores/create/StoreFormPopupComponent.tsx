import React, { useCallback, useEffect, useRef } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Dialog,
  Typography,
  Stepper,
  Step,
  CardHeader,
} from "@material-tailwind/react";
import {
  HomeIcon,
  CameraIcon,
  GlobeEuropeAfricaIcon,
} from "@heroicons/react/24/outline";

import LoadingSpinner from "@/app/components/widgets/LoadingSpinner";
import { AdminStoreHookDto } from "@/app/hooks/pages/administration/stores/useAdminStore";
import { CreateStoreFirstStepComponent } from "./stepper/FirstStepComponent";
import { CreateStoreSecondStepComponent } from "./stepper/SecondStepComponent";
import { CreateStoreThirdStepComponent } from "./stepper/ThirdStepComponent";

export function CreateStoreFormPopupComponent({
  adminStoreHook,
}: {
  adminStoreHook: AdminStoreHookDto;
}) {
  const {
    isLoading,
    isOpenStoreForm,
    responseData,
    formErrors,
    croppedImage,
    currencies,
    isEditable,
    handleSubmit,
    handleIsOpenStoreForm,
    submitFormData,
    handleUpdatePhotoField,
    getCurrencies,
  } = adminStoreHook;

  const [activeStep, setActiveStep] = React.useState(0);
  const [isLastStep, setIsLastStep] = React.useState(false);
  const [isFirstStep, setIsFirstStep] = React.useState(false);
  const nextFormBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setActiveStep(0);
    if (isOpenStoreForm && !isEditable) {
      nextFormBtnRef.current && nextFormBtnRef.current.click();
    }
  }, [isOpenStoreForm, nextFormBtnRef, isEditable, setActiveStep]);

  useEffect(() => {
    if (currencies.length <= 0 && isOpenStoreForm) {
      getCurrencies();
    }
  }, [isOpenStoreForm, currencies, getCurrencies]);

  const handlePrev = () => {
    handleUpdatePhotoField(null);
    !isFirstStep && setActiveStep((cur) => cur - 1);
  };

  const handleNext = useCallback(() => {
    if (isFirstStep) {
      if (
        !formErrors.name &&
        !formErrors.description &&
        !formErrors.currencyId &&
        !formErrors.storeTypeId
      ) {
        setTimeout(() => {
          setActiveStep((cur) => cur + 1);
        }, 200);
      }
    }

    if (activeStep === 1) {
      if (
        !formErrors.phoneNumber &&
        !formErrors.country &&
        !formErrors.address
      ) {
        setTimeout(() => {
          setActiveStep((cur) => cur + 1);
        }, 200);
      }
    }

    if (isLastStep) {
      if (croppedImage) {
        handleUpdatePhotoField(croppedImage.base64);
      }
    }
  }, [
    isLastStep,
    activeStep,
    isFirstStep,
    formErrors,
    croppedImage,
    handleUpdatePhotoField,
  ]);

  useEffect(() => {
    if (responseData?.status) {
      setActiveStep(0);
    }
  }, [responseData, setActiveStep]);

  return (
    <>
      <Dialog
        placeholder={""}
        size="lg"
        open={isOpenStoreForm}
        handler={handleIsOpenStoreForm}
        className="bg-transparent shadow-none"
      >
        <Card placeholder={""} className="mx-auto w-full dark:bg-dark-600">
          <CardHeader placeholder={""} className="shadow-none mt-5">
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
          </CardHeader>
          <LoadingSpinner isLoading={isLoading}>
            <form method="post" onSubmit={handleSubmit(submitFormData)}>
              <CardBody placeholder={""} className="flex flex-col gap-4">
                <div className="w-full min-h-[400px]">
                  <Stepper
                    placeholder={""}
                    activeStep={activeStep}
                    isLastStep={(value) => setIsLastStep(value)}
                    isFirstStep={(value) => setIsFirstStep(value)}
                  >
                    <Step placeholder={""}>
                      <HomeIcon className="h-5 w-5" />
                    </Step>
                    <Step placeholder={""}>
                      <GlobeEuropeAfricaIcon className="h-5 w-5" />
                    </Step>
                    <Step placeholder={""}>
                      <CameraIcon className="h-5 w-5" />
                    </Step>
                  </Stepper>

                  {isFirstStep && (
                    <div
                      className={`${isFirstStep ? "w-full mt-12" : "hidden"}`}
                    >
                      <CreateStoreFirstStepComponent
                        adminStoreHook={adminStoreHook}
                      />
                    </div>
                  )}

                  {activeStep == 1 && (
                    <div
                      className={`${
                        activeStep == 1 ? "w-full mt-12" : "hidden"
                      }`}
                    >
                      <CreateStoreSecondStepComponent
                        adminStoreHook={adminStoreHook}
                      />
                    </div>
                  )}

                  {isLastStep && (
                    <div
                      className={`${isLastStep ? "w-full mt-12" : "hidden"}`}
                    >
                      <CreateStoreThirdStepComponent
                        adminStoreHook={adminStoreHook}
                      />
                    </div>
                  )}

                  <div className="mt-16 flex justify-between">
                    <Button
                      placeholder={""}
                      onClick={handlePrev}
                      disabled={isFirstStep}
                    >
                      Prev
                    </Button>
                    <Button
                      type={`${
                        isLastStep
                          ? "submit"
                          : !isEditable
                          ? "submit"
                          : "button"
                      }`}
                      placeholder={""}
                      ref={nextFormBtnRef}
                      onClick={!isLastStep ? handleNext : () => {}}
                    >
                      {!isLastStep ? "Next" : "Save"}
                    </Button>
                  </div>
                </div>
              </CardBody>
              <CardFooter placeholder={""} className="">
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

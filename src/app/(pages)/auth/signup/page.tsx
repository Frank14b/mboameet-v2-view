"use client";

import LoadingSpinnerComponent from "@/app/components/commons/loadingSpinner";
import InputFormComponent from "@/app/components/widgets/inputForm";
import { proceedRegister } from "@/app/services";
import { ApiResponseDto, RegistrationFormData, ResultloginDto } from "@/app/types";
import { signUpSchema } from "@/app/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function SignUpPage() {

    const [stepper, setStepper] = useState<number>(0);
    const [open, setOpen] = useState(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema), // Integrate Yup for validation
    });
    const [requestData, setRequestData] = useState<ApiResponseDto<ResultloginDto> | null>(null)

    const submitFormData = async (data: RegistrationFormData) => {
        if (stepper < 2) return;
        setIsLoading(true);
        const result = await proceedRegister(data);
        setIsLoading(false);
        setRequestData(result);

        if (result.status === true) {
            setStepper(stepper + 1);
        }
    }

    useEffect(() => {
        switchSepper()
    }, [errors])

    useEffect(() => {
        if (isLoading) return;
        reset();
    }, [isLoading])

    const switchSepper = () => {
        setTimeout(() => {
            if (stepper === 0) {
                const username = watch("username");
                const email = watch("email");

                if (errors?.username == undefined &&
                    username &&
                    errors?.email == undefined &&
                    email
                ) {
                    setStepper(stepper + 1);
                }
            } else if (stepper === 1) {
                const phone = watch("phone");

                if (errors?.phone == undefined &&
                    phone
                ) {
                    setStepper(stepper + 1);
                }
            }
        }, 100);
    }

    const switchbackStepper = () => {
        setStepper(stepper - 1);
    }

    return (
        <div className="mh-600">
            <div className="flex">

                <div className="w-1/2 bg-pink-300">
                    <div className="flex flex-col items-center justify-end">
                        <div className="w-full">
                            <div className="flex flex-col items-center">
                                <img src="../communication-social-media-icons-smartphone-device.jpg" className="h-screen object-cover w-full" />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-1/2 bg-gray-200">
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="relative flex flex-col text-gray-700 bg-white shadow-md w-96 rounded-xl bg-clip-border">
                            <div
                                className="relative grid mx-4 mb-0 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-pink-300 from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                                <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                                    Sign Up
                                </h3>

                            </div>
                            <p className="text-sm text-gray-600 mt-4 px-5 text-center">
                                Fill the required fields bellow or use the secial button below
                            </p>
                            <div className="p-5">
                                <LoadingSpinnerComponent isLoading={isLoading}>
                                    <form method='post' onSubmit={handleSubmit(submitFormData)}>
                                        <div className="space-y-12">
                                            <div className="border-0 border-gray-900/10 pb-4">
                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">

                                                    <div className={`mt-1 grid grid-cols-1 gap-x-6 ${stepper != 0 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">
                                                            Account Identity
                                                        </h3>
                                                        <div className="grid gap-4 mb-4 grid-cols-1">
                                                            <div>
                                                                <InputFormComponent data={{ title: "How can we call you?", name: "Username" }} register={register} error={errors.username} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "What's your email address?", name: "Email", type: "email" }} register={register} error={errors.email} />
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="text-white mt-5 bg-pink-300 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                                            Next Step: Personal Details
                                                        </button>
                                                    </div>

                                                    <div className={`mt-1 grid grid-cols-1 gap-x-6 ${stepper != 1 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">Personal Information</h3>
                                                        <div className="grid gap-4 mb-4 grid-cols-1">
                                                            <div>
                                                                <InputFormComponent data={{ title: "Firstname (Optional)", name: "Firstname" }} register={register} error={errors.firstname} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "Lastname (Optional)", name: "Lastname" }} register={register} error={errors.lastname} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "Phone Number (Optional)", name: "phone" }} register={register} error={errors.phone} />
                                                            </div>
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

                                                    <div className={`mt-1 grid grid-cols-1 gap-x-6 ${stepper != 2 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">Account Security</h3>
                                                        <div className="grid gap-4 mb-4 grid-cols-1">
                                                            <div>
                                                                <InputFormComponent data={{ title: "Password", type: 'password' }} register={register} error={errors.password} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "Confirm Password", type: 'password', name: "confirmpassword" }} register={register} error={errors.confirmpassword} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <button
                                                                onClick={switchbackStepper}
                                                                type="button"
                                                                className="rounded-md border bg-white-600 w-1/2 px-3 py-2 text-sm font-semibold text-pink-300 hover:text-white shadow-sm hover:bg-pink-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                            >
                                                                Back
                                                            </button>
                                                            <button
                                                                type="submit"
                                                                className="rounded-md bg-pink-300 w-1/2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                            >
                                                                Proceed
                                                            </button>
                                                        </div>
                                                    </div>

                                                    <div className={`mt-10 grid grid-cols-1 gap-x-6 text-center ${stepper != 3 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-bold leading-none text-green-600 dark:text-green-800">Congratulations</h3>
                                                        <div className="grid gap-4 mb-4 sm:grid-cols-1 bg-gray-100 p-3 rounded-md border">
                                                            <div>
                                                                <h3>Your account <b>{requestData?.data?.email}</b> has been created successfully</h3>
                                                                <p>Check your email address to activate your account</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <button
                                                                onClick={() => { setOpen(false); setStepper(0) }}
                                                                type="button"
                                                                className="rounded-md bg-pink-300 w-full px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-pink-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                            >
                                                                Close
                                                            </button>
                                                        </div>
                                                    </div>

                                                </div>
                                            </div>
                                        </div>

                                        {requestData?.status === false && <span className='text-red-500 mt-5'>{requestData?.message}</span>}

                                        <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                                            Already have an account?
                                            <Link href="/auth/signin"
                                                className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                                Sign In
                                            </Link>
                                        </p>

                                    </form>
                                </LoadingSpinnerComponent>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
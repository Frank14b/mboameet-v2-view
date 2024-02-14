"use client";

import LoadingSpinnerComponent from "@/app/components/commons/loadingSpinner";
import InputFormComponent from "@/app/components/widgets/inputForm";
import Link from "next/link";
import { useSignUpContext } from "./template";

export default function SignUpPage() {

    const signUpContext = useSignUpContext();

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

                <div className="w-1/2 bg-gray-200 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 dark:border-1 dark:shadow-xs shadow-md w-96 rounded-xl bg-clip-border">
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
                                <LoadingSpinnerComponent isLoading={signUpContext.isLoading}>
                                    <form method='post' onSubmit={signUpContext.handleSubmit(signUpContext.submitFormData)}>
                                        <div className="space-y-12">
                                            <div className="border-0 border-gray-900/10 pb-4">
                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">

                                                    <div className={`mt-1 grid grid-cols-1 gap-x-6 ${signUpContext.stepper != 0 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">
                                                            Account Identity
                                                        </h3>
                                                        <div className="grid gap-4 mb-4 grid-cols-1">
                                                            <div>
                                                                <InputFormComponent data={{ title: "How can we call you?", name: "Username" }} register={signUpContext.register} error={signUpContext.errors.username} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "What's your email address?", name: "Email", type: "email" }} register={signUpContext.register} error={signUpContext.errors.email} />
                                                            </div>
                                                        </div>
                                                        <button type="submit" className="text-white mt-5 bg-pink-300 hover:bg-pink-400 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                                            Next Step: Personal Details
                                                        </button>
                                                    </div>

                                                    <div className={`mt-1 grid grid-cols-1 gap-x-6 ${signUpContext.stepper != 1 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">Personal Information</h3>
                                                        <div className="grid gap-4 mb-4 grid-cols-1">
                                                            <div>
                                                                <InputFormComponent data={{ title: "Firstname (Optional)", name: "Firstname" }} register={signUpContext.register} error={signUpContext.errors.firstname} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "Lastname (Optional)", name: "Lastname" }} register={signUpContext.register} error={signUpContext.errors.lastname} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "Phone Number (Optional)", name: "phone" }} register={signUpContext.register} error={signUpContext.errors.phone} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <button
                                                                onClick={signUpContext.switchbackStepper}
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

                                                    <div className={`mt-1 grid grid-cols-1 gap-x-6 ${signUpContext.stepper != 2 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-700 leading-none text-pink-600 dark:text-pink-600">Account Security</h3>
                                                        <div className="grid gap-4 mb-4 grid-cols-1">
                                                            <div>
                                                                <InputFormComponent data={{ title: "Password", type: 'password' }} register={signUpContext.register} error={signUpContext.errors.password} />
                                                            </div>
                                                            <div>
                                                                <InputFormComponent data={{ title: "Confirm Password", type: 'password', name: "confirmpassword" }} register={signUpContext.register} error={signUpContext.errors.confirmpassword} />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <button
                                                                onClick={signUpContext.switchbackStepper}
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

                                                    <div className={`mt-10 grid grid-cols-1 gap-x-6 text-center ${signUpContext.stepper != 3 && "hidden"}`}>
                                                        <h3 className="mb-4 text-md font-medium font-bold leading-none text-green-600 dark:text-green-800">Congratulations</h3>
                                                        <div className="grid gap-4 mb-4 sm:grid-cols-1 bg-gray-100 p-3 rounded-md border">
                                                            <div>
                                                                <h3>Your account <b>{signUpContext.requestData?.data?.email}</b> has been created successfully</h3>
                                                                <p>Check your email address to activate your account</p>
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-between mt-5">
                                                            <button
                                                                onClick={() => { signUpContext.setOpen(false); signUpContext.setStepper(0) }}
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

                                        {signUpContext.requestData?.status === false && <span className='text-red-500 mt-5'>{signUpContext.requestData?.message}</span>}

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
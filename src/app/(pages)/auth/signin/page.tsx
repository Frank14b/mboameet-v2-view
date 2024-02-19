"use client";

import LoadingSpinnerComponent from "@/app/components/commons/loadingSpinner";
import InputFormComponent from "@/app/components/widgets/inputForm";
import { Button } from "@material-tailwind/react";
import Link from "next/link";
import { SignInContextDto, useSignInContext } from "./template";

export default function SignInPage() {

    const signInContext: SignInContextDto = useSignInContext();

    return (
        <div className="mh-600">
            <div className="flex">
                <div className="w-1/2 bg-gray-200 dark:bg-gray-900">
                    <div className="flex flex-col items-center justify-center h-screen">
                        <div className="relative flex flex-col text-gray-700 bg-white dark:bg-gray-800 shadow-md w-96 rounded-xl bg-clip-border">
                            <div
                                className="relative grid mx-4 mb-4 -mt-6 overflow-hidden text-white shadow-lg h-28 place-items-center rounded-xl bg-pink-300 from-gray-900 to-gray-800 bg-clip-border shadow-gray-900/20">
                                <h3 className="block font-sans text-3xl antialiased font-semibold leading-snug tracking-normal text-white">
                                    Sign In
                                </h3>
                            </div>
                            <LoadingSpinnerComponent isLoading={signInContext.isLoading}>
                                <form method='post' onSubmit={signInContext.handleSubmit(signInContext.submitFormData)}>
                                    <div className="flex flex-col gap-4 p-6">
                                        <div className="relative w-full min-w-[200px]">
                                            <InputFormComponent data={{ title: "Username" }} register={signInContext.register} error={signInContext.errors?.username} />
                                        </div>
                                        <div className="relative w-full min-w-[200px]">
                                            <InputFormComponent data={{ title: "Password", type: 'password' }} register={signInContext.register} error={signInContext.errors?.password} />
                                        </div>
                                        <div className="-ml-2.5">
                                            <div className="inline-flex items-center">
                                                <label htmlFor="checkbox" className="relative flex items-center p-3 rounded-full cursor-pointer">
                                                    <input type="checkbox"
                                                        className="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:bg-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
                                                        id="checkbox" />
                                                    <span
                                                        className="absolute text-white transition-opacity opacity-0 pointer-events-none top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 peer-checked:opacity-100">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20" fill="currentColor"
                                                            stroke="currentColor" strokeWidth="1">
                                                            <path fillRule="evenodd"
                                                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                                clipRule="evenodd"></path>
                                                        </svg>
                                                    </span>
                                                </label>
                                                <label className="mt-px font-light text-gray-700 cursor-pointer select-none" htmlFor="checkbox">
                                                    Remember Me
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6 pt-0">

                                        <Button type='submit' placeholder={""} color="blue" className='w-full bg-pink-300'>Proceed</Button>

                                        <p className="mt-3">
                                            {signInContext.requestData?.status === false && <span className='text-red-500 mt-5'>{signInContext.requestData?.message}</span>}
                                        </p>

                                        <p className="flex justify-center mt-6 font-sans text-sm antialiased font-light leading-normal text-inherit">
                                            Don't have an account?
                                            <Link href="/auth/signup"
                                                className="block ml-1 font-sans text-sm antialiased font-bold leading-normal text-blue-gray-900">
                                                Sign up
                                            </Link>
                                        </p>
                                    </div>
                                </form>
                            </LoadingSpinnerComponent>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 bg-pink-300">
                    <div className="flex flex-col items-center justify-end">
                        <div className="w-full">
                            <div className="flex flex-col items-center">
                                <img src="../full-shot-people-use-apps-make-friends.jpg" className="h-screen object-cover w-full" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
"use client";

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import InputFormComponent from '../../widgets/inputForm'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInSchema } from '@/app/validators'
import { proceedLogin } from '@/app/services';
import { ApiResponseDto, LoginFormData, ResultloginDto } from '@/app/types';
import LoadingSpinnerComponent from '../../commons/loadingSpinner';
import RegistrationPopupComponent from './register';
import Link from 'next/link';
import { Button } from '@material-tailwind/react';

export default function LoginPopupComponent({ children }: { children: React.ReactNode }) {

    const [openLogin, setOpenLogin] = useState(false)
    const cancelButtonRef = useRef(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(signInSchema), // Integrate Yup for validation
    });
    const [requestData, setRequestData] = useState<ApiResponseDto<ResultloginDto> | null>(null)

    const submitFormData = async (data: LoginFormData) => {
        setIsLoading(true);
        const result = await proceedLogin(data);
        setRequestData(result);
        setIsLoading(false);

        if (result.status === true) setOpenLogin(false);
    }

    return (
        <>
            <div onClick={() => setOpenLogin(true)}>{children}</div>

            <Transition.Root show={openLogin} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpenLogin}>
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">

                                    <div className="bg-white px-4 pb-1 pt-5 sm:p-6 sm:pb-4">
                                        <div className="sm:flex sm:items-start">
                                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                                                <UserCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                                            </div>
                                            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                                                <Dialog.Title as="h3" className="text-base font-semibold leading-6 text-gray-900">
                                                    Login to your account
                                                </Dialog.Title>
                                                <div className="mt-2">
                                                    <p className="text-sm text-gray-500">
                                                        Fill the required fields bellow or use the secial button below
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="px-1">
                                            <div>

                                                <LoadingSpinnerComponent isLoading={isLoading}>
                                                    <form method='post' onSubmit={handleSubmit(submitFormData)}>
                                                        <div className="space-y-12">
                                                            <div className="border-0 border-gray-900/10 pb-4">
                                                                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">

                                                                    <InputFormComponent data={{ title: "Username" }} register={register} error={errors?.username} />

                                                                    <InputFormComponent data={{ title: "Password", type: 'password' }} register={register} error={errors?.password} />

                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div className="mt-5 flex items-center justify-end gap-x-6 mb-4">
                                                            <Button type='submit' placeholder={""} color="blue" className='w-full bg-indigo-600'>Proceed</Button>
                                                        </div>

                                                        {requestData?.status === false && <span className='text-red-500 mt-5'>{requestData?.message}</span>}

                                                    </form>
                                                </LoadingSpinnerComponent>

                                                <div className="mt-3 text-sm flex items-center text-center justify-end gap-x-2 mb-4">
                                                    Don't have account?

                                                    <RegistrationPopupComponent>
                                                        <a href="#" className='text-indigo-600 font-bold'>Register now</a>
                                                    </RegistrationPopupComponent>

                                                </div>

                                                <div className="mt-3 text-sm flex items-center text-center justify-end gap-x-2 mb-4">
                                                    Forgot Password?

                                                    <Link onClick={() => setOpenLogin(false)} href="/auth/forget-password" className='text-indigo-600 font-bold'>Change now</Link>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpenLogin(false)}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root >
        </>
    )
}

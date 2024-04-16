"use client";

import { useEffect, useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import InputFormComponent from '../../widgets/inputForm'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { changePasswordSchema } from '@/app/validators'
import { proceedChangePassword } from '@/app/services/server-actions';
import { ApiResponseDto, BooleanResultDto, ChangePasswordDto } from '@/app/types';
import LoadingSpinnerComponent from '../../commons/loadingSpinner';
import RegistrationPopupComponent from './register';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { type } from 'os';

//
export default function ChangePasswordComponent({ token }:{ token: string}) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(changePasswordSchema), // Integrate Yup for validation
    });
    const [requestData, setRequestData] = useState<ApiResponseDto<BooleanResultDto<string>> | null>(null)
    const router = useRouter();

    const submitFormData = async (data: ChangePasswordDto) => {
        setIsLoading(true);
        const result = await proceedChangePassword({
            ...data,
            token: token
        });
        setRequestData(result);
        setIsLoading(false);
        router.push("/");
    }
    
    return (
        <>
            <div className="bg-white px-4 pb-1 pt-5 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <UserCircleIcon className="h-6 w-6 text-blue-600" aria-hidden="true" />
                    </div>
                    <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <h3 className="text-base font-semibold leading-6 text-gray-900">
                            Change Account Password
                        </h3>
                        <div className="mt-2">
                            <p className="text-sm text-gray-500">
                                Fill the required fields bellow or use the secial button below
                            </p>
                        </div>
                    </div>
                </div>

                <div className="px-1 relative">
                    <div>

                        <LoadingSpinnerComponent isLoading={isLoading}>
                            <form method='post' onSubmit={handleSubmit(submitFormData)}>
                                <div className="space-y-12">
                                    <div className="border-0 border-gray-900/10 pb-4">
                                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">

                                            <InputFormComponent data={{ title: "Enter new password", name: 'password', type: 'password' }} register={register} error={errors?.password} />

                                            <InputFormComponent data={{ title: "Confirm new password", name: 'confirmpassword', type: 'password' }} register={register} error={errors?.confirmpassword} />

                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-end gap-x-6 mb-4">
                                    <Button type='submit' placeholder={""} color="blue" className='w-full bg-indigo-600'>Proceed</Button>
                                </div>

                                {requestData?.status === false && <span className='text-red-500 mt-5'>{requestData?.message}</span>}

                            </form>
                        </LoadingSpinnerComponent>

                        <div className="mt-3 flex items-center text-center justify-end gap-x-2 mb-4">
                            Don't have account yet ?

                            <RegistrationPopupComponent>
                                <Link href="/" className='text-indigo-600 font-bold text-sm'>Register now</Link>
                            </RegistrationPopupComponent>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

"use client";

import { useState } from 'react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import InputFormComponent from '../../widgets/inputForm'
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgetPasswordSchema } from '@/app/validators'
import { proceedForgetPassword } from '@/app/services/server-actions';
import { ApiResponseDto, ForgetPasswordDto, ResultForgetPasswordDto } from '@/app/types';
import LoadingSpinnerComponent from '../../commons/loadingSpinner';
import RegistrationPopupComponent from './register';
import { Button } from '@material-tailwind/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

//
export default function ForgetPasswordComponent() {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(forgetPasswordSchema), // Integrate Yup for validation
    });
    const [requestData, setRequestData] = useState<ApiResponseDto<ResultForgetPasswordDto> | null>(null)
    const router = useRouter();

    const submitFormData = async (data: ForgetPasswordDto) => {
        setIsLoading(true);
        const result = await proceedForgetPassword(data);

        setRequestData(result);
        setIsLoading(false);

        if(result.status == true) {
            router.push(`/auth/verify-token/${result?.data?.otpToken}`)
        }
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
                            Forget Password
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

                                            <InputFormComponent data={{ title: "Email" }} register={register} error={errors?.email} />

                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-end gap-x-6 mb-4">
                                    <Button type='submit' placeholder={""} color="blue" className='w-full bg-indigo-600'>Proceed</Button>
                                </div>

                                {requestData?.status === false && <span className='text-red-500 mt-5'>{requestData?.message}</span>}

                                {requestData?.status === true && <span className='text-green-500 mt-5'>{requestData?.data?.message}</span>}

                            </form>
                        </LoadingSpinnerComponent>

                        <div className="mt-3 flex items-center text-center justify-end gap-x-2 mb-4">
                            Already have account ?

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

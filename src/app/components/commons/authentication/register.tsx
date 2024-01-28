import { Fragment, useEffect, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserCircleIcon } from '@heroicons/react/24/outline'
import InputFormComponent from '../../widgets/inputForm'
import { ApiResponseDto, RegistrationFormData, ResultloginDto } from '@/app/types'
import { signUpSchema } from '@/app/validators'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { proceedRegister } from '@/app/services'


export default function RegistrationPopupComponent({ children }: { children: React.ReactNode }) {

    const [stepper, setStepper] = useState<number>(0);
    const [open, setOpen] = useState(false)
    const cancelButtonRef = useRef(null)
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(signUpSchema), // Integrate Yup for validation
    });
    const [requestData, setRequestData] = useState<ApiResponseDto<ResultloginDto> | null>(null)

    const submitFormData = async (data: RegistrationFormData) => {
        const result = await proceedRegister(data);
        setRequestData(result);
    }

    useEffect(() => {
        switchSepper()
    }, [errors])

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
        <>
            <div onClick={() => setOpen(true)}>{children}</div>

            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
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
                                                    Create new account
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
                                                <form method='post' onSubmit={handleSubmit(submitFormData)}>
                                                    <div className="space-y-12">
                                                        <div className="border-0 border-gray-900/10 pb-4">
                                                            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-3">


                                                                <ol className="flex items-center w-full mb-4 sm:mb-5">
                                                                    <li className="flex w-full items-center text-blue-600 dark:text-blue-500 after:content-[''] after:w-full after:h-1 after:border-b after:border-blue-100 after:border-4 after:inline-block dark:after:border-blue-800">
                                                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-${stepper > 0 ? "green" : "blue"}-800 shrink-0`}>
                                                                            <svg className="w-4 h-4 text-gray-200 lg:w-6 lg:h-6 dark:text-white-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 16">
                                                                                <path d="M18 0H2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM6.5 3a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3.014 13.021l.157-.625A3.427 3.427 0 0 1 6.5 9.571a3.426 3.426 0 0 1 3.322 2.805l.159.622-6.967.023ZM16 12h-3a1 1 0 0 1 0-2h3a1 1 0 0 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Zm0-3h-3a1 1 0 1 1 0-2h3a1 1 0 1 1 0 2Z" />
                                                                            </svg>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700">
                                                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-${stepper > 1 ? "green" : "blue"}-800 shrink-0`}>
                                                                            <svg className="w-4 h-4 text-gray-200 lg:w-6 lg:h-6 dark:text-white-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 14">
                                                                                <path d="M18 0H2a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2ZM2 12V6h16v6H2Z" />
                                                                                <path d="M6 8H4a1 1 0 0 0 0 2h2a1 1 0 0 0 0-2Zm8 0H9a1 1 0 0 0 0 2h5a1 1 0 1 0 0-2Z" />
                                                                            </svg>
                                                                        </div>
                                                                    </li>
                                                                    <li className="flex items-center w-full">
                                                                        <div className={`flex items-center justify-center w-10 h-10 rounded-full lg:h-12 lg:w-12 dark:bg-${stepper > 2 ? "green" : "blue"}-800 shrink-0`}>
                                                                            <svg className="w-4 h-4 text-gray-200 lg:w-6 lg:h-6 dark:text-white-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                                                                                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2ZM7 2h4v3H7V2Zm5.7 8.289-3.975 3.857a1 1 0 0 1-1.393 0L5.3 12.182a1.002 1.002 0 1 1 1.4-1.436l1.328 1.289 3.28-3.181a1 1 0 1 1 1.392 1.435Z" />
                                                                            </svg>
                                                                        </div>
                                                                    </li>
                                                                </ol>

                                                                <div className={`mt-10 grid grid-cols-1 gap-x-6 ${stepper != 0 && "hidden"}`}>
                                                                    <h3 className="mb-4 text-md font-medium font-700 leading-none text-indigo-600 dark:text-indigo-600">Account Identity</h3>
                                                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                                                        <div>
                                                                            <InputFormComponent data={{ title: "How can we call you?", name: "Username" }} register={register} error={errors.username} />
                                                                        </div>
                                                                        <div>
                                                                            <InputFormComponent data={{ title: "What's your email address?", name: "Email", type: "email" }} register={register} error={errors.email} />
                                                                        </div>
                                                                    </div>
                                                                    <button type="submit" className="text-white mt-5 bg-indigo-600 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-indigo-600 dark:hover:bg-indigo-700 dark:focus:ring-indigo-800">
                                                                        Next Step: Personal Details
                                                                    </button>
                                                                </div>

                                                                <div className={`mt-10 grid grid-cols-1 gap-x-6 ${stepper != 1 && "hidden"}`}>
                                                                    <h3 className="mb-4 text-md font-medium font-700 leading-none text-indigo-600 dark:text-indigo-600">Personal Information</h3>
                                                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
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
                                                                            className="rounded-md border bg-white-600 w-1/3 px-3 py-2 text-sm font-semibold text-indigo-600 hover:text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Back: Identity
                                                                        </button>
                                                                        <button
                                                                            type="submit"
                                                                            className="rounded-md bg-indigo-600 w-1/2 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Next step: Security
                                                                        </button>
                                                                    </div>
                                                                </div>

                                                                <div className={`mt-10 grid grid-cols-1 gap-x-6 ${stepper != 2 && "hidden"}`}>
                                                                    <h3 className="mb-4 text-md font-medium font-700 leading-none text-indigo-600 dark:text-indigo-600">Account Security</h3>
                                                                    <div className="grid gap-4 mb-4 sm:grid-cols-2">
                                                                        <div>
                                                                            <InputFormComponent data={{ title: "Password", type: 'password' }} register={register} error={errors.password} />
                                                                        </div>
                                                                        <div>
                                                                            <InputFormComponent data={{ title: "Confirm Password", type: 'password', name: "confirmpassword" }} register={register} error={errors.confirmpassword} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <button
                                                                            onClick={switchbackStepper}
                                                                            type="button"
                                                                            className="rounded-md border bg-white-600 w-1/3 px-3 py-2 text-sm font-semibold text-indigo-600 hover:text-white shadow-sm hover:bg-indigo-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Back
                                                                        </button>
                                                                        <button
                                                                            type="submit"
                                                                            className="rounded-md bg-indigo-600 w-1/3 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                                                        >
                                                                            Proceed
                                                                        </button>
                                                                    </div>
                                                                </div>


                                                            </div>
                                                        </div>
                                                    </div>

                                                    {requestData?.status === false && <span className='text-red-500 mt-5'>{requestData?.message}</span>}

                                                </form>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                        <button
                                            type="button"
                                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                            onClick={() => setOpen(false)}
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

"use client";

import { useMainContext } from "@/app/contexts/main";
import { EnvelopeIcon, PencilIcon, UserIcon } from "@heroicons/react/24/solid";
import { Avatar, Input, Typography } from "@material-tailwind/react";
import { ChangeEvent } from "react";

export default function ProfilePage() {

    const mainContext = useMainContext();

    return <>
        <div className="w-full flex absolute dark:text-white right-0 px-5">
            <div className="w-1/2"><Typography placeholder={""} className="font-bold px-1">Profile</Typography></div>
            <div className="w-1/2 text-xs flex justify-end pt-1">
                <span className="mx-2 cursor-pointer font-bold flex cursor-pointer">Edit&nbsp;<PencilIcon width={15} height={15}/></span>
            </div>
        </div>
        {/*  */}

        <div className="w-full mt-12">

            <div className="flex items-center justify-center w-full">
                <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-800 dark:hover:bg-gray-900">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>

                        <Avatar
                            placeholder={""}
                            variant="circular"
                            alt={mainContext.connectedUser.username}
                            size="xxl"
                            className="cursor-pointer mt-5 border-2 border-pink-100"
                            src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80"
                        ></Avatar>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" />
                </label>
            </div>

            {/* <div className="border-2 p-3 mt-6 rounded-lg">
                <span className="flex cursor-pointer flex-col items-center justify-center">Edit Profile &nbsp;<PencilIcon width={20} height={20}/></span>
            </div> */}

            <div className="w-full mt-6">
                <ul className="flex flex-col w-full">

                    <li className="relative flex flex-col gap-2">
                        <span className="absolute left-0 grid !w-[78px] justify-center bg-transparent transition-opacity duration-200">
                            <span className="h-full w-0.5 bg-blue-gray-100"></span>
                        </span>
                        <div
                            className="relative flex items-center gap-4 py-3 pl-4 pr-8 bg-white dark:bg-black/35 dark:border-0 border shadow-lg rounded-0 border-blue-gray-50 shadow-blue-gray-900/5">
                            <span
                                className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900/10 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-300">
                                <UserIcon width={25} height={25} />
                            </span>
                            <div className="flex flex-col gap-1">
                                <h6
                                    className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 dark:text-gray-200">
                                    Your User Name
                                </h6>
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 dark:text-gray-400">
                                    {mainContext.connectedUser?.userName}
                                </p>
                            </div>
                        </div>
                    </li>

                    <li className="relative flex flex-col gap-2">
                        <span className="absolute left-0 grid !w-[78px] justify-center bg-transparent transition-opacity duration-200">
                            <span className="h-full w-0.5 bg-blue-gray-100"></span>
                        </span>
                        <div
                            className="relative flex items-center gap-4 py-3 pl-4 pr-8 bg-white dark:bg-black/35 dark:border-0 border shadow-lg rounded-0 border-blue-gray-50 shadow-blue-gray-900/5">
                            <span
                                className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900/10 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-300">
                                <UserIcon width={25} height={25} />
                            </span>
                            <div className="flex flex-col gap-1">
                                <h6
                                    className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 dark:text-gray-200">
                                    Your Full Name
                                </h6>
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 dark:text-gray-400">
                                    {mainContext.connectedUser?.firstName ?? "-"} {mainContext.connectedUser?.lastName ?? "-"}
                                </p>
                            </div>
                        </div>
                    </li>

                    <li className="relative flex flex-col gap-2">
                        <span className="absolute left-0 grid !w-[78px] justify-center bg-transparent transition-opacity duration-200">
                            <span className="h-full w-0.5 bg-blue-gray-100"></span>
                        </span>
                        <div
                            className="relative flex items-center gap-4 py-3 pl-4 pr-8 bg-white dark:bg-black/35 dark:border-0 border shadow-lg rounded-0 border-blue-gray-50 shadow-blue-gray-900/5">
                            <span
                                className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900/10 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-300">
                                <EnvelopeIcon width={25} height={25} />
                            </span>
                            <div className="flex flex-col gap-1">
                                <h6
                                    className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 dark:text-gray-200">
                                    Your Email Address
                                </h6>
                                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 dark:text-gray-400">
                                    {mainContext.connectedUser?.email}
                                </p>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>

        </div>

        {/*  */}
    </>
}
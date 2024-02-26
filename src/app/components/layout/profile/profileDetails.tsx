'use client';

import { ObjectKeyDto, ResultloginDto } from "@/app/types";
import { EnvelopeIcon, UserIcon } from "@heroicons/react/24/solid";

export default function ProfileDetailsComponent(
    { connectedUser }: {
        connectedUser: ResultloginDto | ObjectKeyDto | null}) {

    return (
        <>
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
                                    {connectedUser?.userName}
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
                                    {connectedUser?.firstName ?? "-"} {connectedUser?.lastName ?? "-"}
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
                                    {connectedUser?.email}
                                </p>
                            </div>
                        </div>
                    </li>

                </ul>
            </div>
        </>

    );
}

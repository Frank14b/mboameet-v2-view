"use client";

import { useMainContext } from "@/app/contexts/main";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { ChangeEvent } from "react";

export default function SettingsPage() {

    const mainContext = useMainContext();

    return <>

        <div className="w-full flex absolute dark:text-white right-0 px-5">
            <div className="w-1/2"><Typography placeholder={""} className="font-bold px-1">Settings</Typography></div>
            <div className="w-1/2 text-xs flex justify-end pt-1">
                {/* <span className="mx-2 cursor-pointer font-bold">Network</span> */}
            </div>
        </div>
        {/*  */}

        <div className="w-full mt-12">
            <ul className="flex flex-col w-full">
                <li className="relative flex flex-col gap-2 h-28">
                    <span className="absolute left-0 grid !w-[78px] justify-center bg-transparent transition-opacity duration-200">
                        <span className="h-full w-0.5 bg-blue-gray-100"></span>
                    </span>
                    <div
                        className="relative flex items-center gap-4 py-3 pl-4 pr-8 bg-white dark:bg-black/35 dark:border-0 border shadow-lg rounded-xl border-blue-gray-50 shadow-blue-gray-900/5">
                        <span
                            className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900/10 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-300">
                            <LightBulbIcon width={25} height={25} />
                        </span>
                        <div className="flex flex-col gap-1">
                            <h6
                                className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 dark:text-gray-200">
                                Customize your app theme
                            </h6>
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 dark:text-gray-400">
                                Current theme : {mainContext.theme}
                            </p>
                            <div className="w-full">
                                <div className="inline-flex items-center">
                                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                                        <input id="ripple-on" onChange={(e: ChangeEvent<HTMLInputElement>) => mainContext.setTheme(e.target.checked ? "dark" : 'light')} type="checkbox" defaultChecked={mainContext.theme == "dark" ? true : false}
                                            className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 dark:bg-green-400 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900" />
                                        <label htmlFor="ripple-on"
                                            className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900">
                                            <div className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                                                data-ripple-dark="true"></div>
                                        </label>
                                    </div>
                                    <label htmlFor="ripple-on" className="mt-px mb-0 ml-3 font-light text-gray-700 dark:text-gray-400 cursor-pointer select-none">
                                        Dark Mode On
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
                <li className="relative flex flex-col gap-2 h-28">
                    <span className="absolute left-0 grid !w-[78px] justify-center bg-transparent transition-opacity duration-200">
                        <span className="h-full w-0.5 bg-blue-gray-100"></span>
                    </span>
                    <div
                        className="relative flex items-center gap-4 py-3 pl-4 pr-8 bg-white  dark:bg-black/35 dark:border-0 border shadow-lg rounded-xl border-blue-gray-50 shadow-blue-gray-900/5">
                        <span
                            className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-red-500/10 p-3 text-red-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                className="w-5 h-5">
                                <path
                                    d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375z">
                                </path>
                                <path fillRule="evenodd"
                                    d="M3.087 9l.54 9.176A3 3 0 006.62 21h10.757a3 3 0 002.995-2.824L20.913 9H3.087zm6.163 3.75A.75.75 0 0110 12h4a.75.75 0 010 1.5h-4a.75.75 0 01-.75-.75z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <div className="flex flex-col gap-1">
                            <h6
                                className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                New order #1832412
                            </h6>
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                21 DEC 11 PM
                            </p>
                        </div>
                    </div>
                </li>
                <li className="relative flex flex-col gap-2 h-28">
                    <div
                        className="relative flex items-center gap-4 py-3 pl-4 pr-8 bg-white  dark:bg-black/35 dark:border-0 border shadow-lg rounded-xl border-blue-gray-50 shadow-blue-gray-900/5">
                        <span
                            className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-green-500/10 p-3 text-green-500">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"
                                className="w-5 h-5">
                                <path
                                    d="M10.464 8.746c.227-.18.497-.311.786-.394v2.795a2.252 2.252 0 01-.786-.393c-.394-.313-.546-.681-.546-1.004 0-.323.152-.691.546-1.004zM12.75 15.662v-2.824c.347.085.664.228.921.421.427.32.579.686.579.991 0 .305-.152.671-.579.991a2.534 2.534 0 01-.921.42z">
                                </path>
                                <path fillRule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 6a.75.75 0 00-1.5 0v.816a3.836 3.836 0 00-1.72.756c-.712.566-1.112 1.35-1.112 2.178 0 .829.4 1.612 1.113 2.178.502.4 1.102.647 1.719.756v2.978a2.536 2.536 0 01-.921-.421l-.879-.66a.75.75 0 00-.9 1.2l.879.66c.533.4 1.169.645 1.821.75V18a.75.75 0 001.5 0v-.81a4.124 4.124 0 001.821-.749c.745-.559 1.179-1.344 1.179-2.191 0-.847-.434-1.632-1.179-2.191a4.122 4.122 0 00-1.821-.75V8.354c.29.082.559.213.786.393l.415.33a.75.75 0 00.933-1.175l-.415-.33a3.836 3.836 0 00-1.719-.755V6z"
                                    clipRule="evenodd"></path>
                            </svg>
                        </span>
                        <div className="flex flex-col gap-1">
                            <h6
                                className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900">
                                Payment completed for order #4395133
                            </h6>
                            <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700">
                                20 DEC 2:20 AM
                            </p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

        {/*  */}
    </>
}
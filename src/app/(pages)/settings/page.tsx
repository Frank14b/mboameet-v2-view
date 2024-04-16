"use client";

import { useMainContext } from "@/app/contexts/main";
import { LightBulbIcon } from "@heroicons/react/24/solid";
import { Typography } from "@material-tailwind/react";
import { ChangeEvent } from "react";

export default function SettingPage() {
  const mainContext = useMainContext();

  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2">
          <Typography placeholder={""} className="font-bold px-1">
            Settings
          </Typography>
        </div>
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
            <div className="relative flex items-center gap-4 py-3 pl-4 pr-8 bg-white dark:bg-black/35 dark:border-0 border shadow-lg rounded-xl border-blue-gray-50 shadow-blue-gray-900/5">
              <span className="relative z-[2] w-max flex-shrink-0 overflow-hidden rounded-full bg-gray-900/10 p-3 text-gray-900 dark:bg-gray-800 dark:text-gray-300">
                <LightBulbIcon width={25} height={25} />
              </span>
              <div className="flex flex-col gap-1">
                <h6 className="block font-sans text-base antialiased font-semibold leading-relaxed tracking-normal text-blue-gray-900 dark:text-gray-200">
                  Customize your app theme
                </h6>
                <p className="block font-sans text-sm antialiased font-normal leading-normal text-gray-700 dark:text-gray-400">
                  Current theme : {mainContext.theme}
                </p>
                <div className="w-full">
                  <div className="inline-flex items-center">
                    <div className="relative inline-block w-8 h-4 rounded-full cursor-pointer">
                      <input
                        id="ripple-on"
                        onChange={(e: ChangeEvent<HTMLInputElement>) =>
                          mainContext.setTheme(
                            e.target.checked ? "dark" : "light"
                          )
                        }
                        type="checkbox"
                        defaultChecked={
                          mainContext.theme == "dark" ? true : false
                        }
                        className="absolute w-8 h-4 transition-colors duration-300 rounded-full appearance-none cursor-pointer peer bg-blue-gray-100 dark:bg-green-400 checked:bg-gray-900 peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                      />
                      <label
                        htmlFor="ripple-on"
                        className="before:content[''] absolute top-2/4 -left-1 h-5 w-5 -translate-y-2/4 cursor-pointer rounded-full border border-blue-gray-100 bg-white shadow-md transition-all duration-300 before:absolute before:top-2/4 before:left-2/4 before:block before:h-10 before:w-10 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity hover:before:opacity-10 peer-checked:translate-x-full peer-checked:border-gray-900 peer-checked:before:bg-gray-900"
                      >
                        <div
                          className="inline-block p-5 rounded-full top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4"
                          data-ripple-dark="true"
                        ></div>
                      </label>
                    </div>
                    <label
                      htmlFor="ripple-on"
                      className="mt-px mb-0 ml-3 font-light text-gray-700 dark:text-gray-400 cursor-pointer select-none"
                    >
                      Dark Mode On
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      {/*  */}
    </>
  );
}

"use client";

import CustomNextLink from "@/app/components/widgets/customNextLink";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs } from "@material-tailwind/react";

export default function AdministrationPage() {
  //
  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2 px-5 flex">
          <Breadcrumbs placeholder={""} className="dark:bg-gray-800">
            <CustomNextLink href="/">
              <span className="opacity-60 dark:opacity-80 dark:text-gray-100">
                <HomeIcon className="h-4 w-4" />
              </span>
            </CustomNextLink>
            <a href="#" className="dark:text-white text-font-medium">
              Administration
            </a>
          </Breadcrumbs>
        </div>
      </div>
      {/*  */}
      <div className="mt-12"></div>
      {/*  */}
    </>
  );
}

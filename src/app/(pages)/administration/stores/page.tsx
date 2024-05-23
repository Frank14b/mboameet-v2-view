"use client";

import CustomNextLink from "@/app/components/widgets/customNextLink";
import { administrationPathUrl } from "@/app/lib/constants/app";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Button } from "@material-tailwind/react";

export default function ManageStorePage() {
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
            <CustomNextLink href={administrationPathUrl.baseUrl}>
              <span className="opacity-60 dark:opacity-80 dark:text-gray-100">
                Administration
              </span>
            </CustomNextLink>
            <a href="#" className="dark:text-white text-font-medium">
              Stores
            </a>
          </Breadcrumbs>

          <Button
            onClick={() => {}}
            placeholder={""}
            size="sm"
            className="bg-pink-600 mx-3"
          >
            New Store
          </Button>
        </div>
      </div>
      {/*  */}
      <div className="mt-12">

      </div>
      {/*  */}
    </>
  );
}
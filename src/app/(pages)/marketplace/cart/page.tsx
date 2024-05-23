"use client";

import CustomNextLink from "@/app/components/widgets/customNextLink";
import { marketplacePathUrl } from "@/app/lib/constants/app";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs } from "@material-tailwind/react";

export default function ShoppingCartPage() {
  //
  return (
    <>
      <div className="w-full flex absolute dark:text-white right-0 px-5">
        <div className="w-1/2 px-5">
          <Breadcrumbs placeholder={""} className="dark:bg-gray-800">
            <a href="#">
              <span className="opacity-60 dark:opacity-80 dark:text-gray-100">
                <HomeIcon className="h-4 w-4" />
              </span>
            </a>
            <CustomNextLink href={marketplacePathUrl}>
              <span className="opacity-60 dark:opacity-80 dark:text-gray-100">
                MarketPlace
              </span>
            </CustomNextLink>
            <a href="#" className="dark:text-white text-font-medium">
              Shopping Cart
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

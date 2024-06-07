"use client";

import { MarketPlaceCartComponent } from "@/app/components/layout/market-place/cart/CartComponent";
import CustomNextLink from "@/app/components/widgets/CustomNextLink";
import { marketplacePathUrl } from "@/app/lib/constants/app";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs } from "@material-tailwind/react";

export default function ShoppingCartPage() {
  //
  return (
    <div className="container dark:text-white">
      <div className="w-full flex">
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
      {/*  */}
      <div className="mt-12">
        <MarketPlaceCartComponent />
      </div>
      {/*  */}
    </div>
  );
}

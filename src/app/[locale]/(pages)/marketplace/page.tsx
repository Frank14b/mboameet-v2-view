"use client";

import { MarketPlaceComponent } from "@/app/components/layout/market-place/MarketPlaceComponent";
import CustomNextLink from "@/app/components/widgets/CustomNextLink";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { administrationPathUrl } from "@/app/lib/constants/app";
import { Cog6ToothIcon, HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Button } from "@material-tailwind/react";

export default function MarketPlacePage() {
  //
  const { push } = useCustomRouter();

  return (
    <div className="w-full dark:text-white px-5">
      <div className="w-full flex justify-between">
        <Breadcrumbs placeholder={""} className="dark:bg-gray-800">
          <CustomNextLink href="/">
            <span className="opacity-60 dark:opacity-80 dark:text-gray-100">
              <HomeIcon className="h-4 w-4" />
            </span>
          </CustomNextLink>
          <a href="#" className="dark:text-white text-font-medium">
            MarketPlace
          </a>
        </Breadcrumbs>

        <Button
          onClick={() => push(`${administrationPathUrl.stores}`)}
          placeholder={""}
          size="sm"
          className="bg-pink-600 text-xs"
        >
          <Cog6ToothIcon className="w-5 h-5 sm:hidden" />{" "}
          <span className="xs:hidden">Manage My Store</span>
        </Button>
      </div>

      {/*  */}
      <div className="mt-12">
        <MarketPlaceComponent />
      </div>
      {/*  */}
    </div>
  );
}

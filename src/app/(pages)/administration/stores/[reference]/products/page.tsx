"use client";

import { AdminStoreProductsComponent } from "@/app/components/layout/administration/stores/products/AdminProductsComponent";
import CustomNextLink from "@/app/components/widgets/CustomNextLink";
import useAdminStoreProduct from "@/app/hooks/pages/administration/stores/products/useStoreProducts";
import { administrationPathUrl } from "@/app/lib/constants/app";
import { HomeIcon } from "@heroicons/react/24/solid";
import { Breadcrumbs, Button } from "@material-tailwind/react";

export default function StoreProductsPage({
  params,
}: {
  params: {
    reference: string;
  };
}) {
  //
  const adminProductHook = useAdminStoreProduct(params.reference);
  const { handleIsOpenStoreForm } = adminProductHook;

  return (
    <div className="container">
      <div className="w-full flex dark:text-white px-5">
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
          <CustomNextLink href={administrationPathUrl.stores}>
            <span className="opacity-60 dark:opacity-80 dark:text-gray-100">
              Stores
            </span>
          </CustomNextLink>
          <a href="#" className="dark:text-white text-font-medium">
            Products
          </a>
        </Breadcrumbs>

        <Button
          onClick={handleIsOpenStoreForm}
          placeholder={""}
          size="sm"
          className="bg-pink-600 mx-3 xs:hidden"
        >
          New Product
        </Button>
      </div>

      {/*  */}
      <div className="mt-12">
        <AdminStoreProductsComponent adminProductHook={adminProductHook} />
      </div>
      {/*  */}
    </div>
  );
}

"use client";

import { AdminStoreProductsComponent } from "@/app/components/layout/administration/stores/products/AdminProductsComponent";
import CustomNextLink from "@/app/components/widgets/CustomNextLink";
import useAdminStoreProduct from "@/app/hooks/pages/administration/stores/products/useStoreProducts";
import { administrationPathUrl } from "@/app/lib/constants/app";
import { useScopedI18n } from "@/app/locales/client";
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

  const scopedT = useScopedI18n("administration.stores.products");

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
              {scopedT("breadcrumbs.administration")}
            </span>
          </CustomNextLink>
          <CustomNextLink href={administrationPathUrl.stores}>
            <span className="opacity-60 dark:opacity-80 dark:text-gray-100">
              {scopedT("breadcrumbs.stores")}
            </span>
          </CustomNextLink>
          <a href="#" className="dark:text-white text-font-medium">
            {scopedT("breadcrumbs.products")}
          </a>
        </Breadcrumbs>

        <Button
          onClick={handleIsOpenStoreForm}
          placeholder={""}
          size="sm"
          className="bg-pink-600 mx-3 xs:hidden"
        >
          {scopedT("breadcrumbs.add_btn_text")}
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
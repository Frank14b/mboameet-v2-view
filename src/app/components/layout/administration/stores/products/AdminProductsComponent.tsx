import React, { useMemo, useState } from "react";
import {
  CurrencyEuroIcon,
  PencilIcon,
  PlusIcon,
  ShoppingBagIcon,
} from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Chip,
  IconButton,
  Typography,
} from "@material-tailwind/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import CustomNextImage from "@/app/components/widgets/CustomNextImage";
import StoreSkeleton from "@/app/components/widgets/skeletons/administration/StoreSkeleton";
import { NoDataFound } from "@/app/components/widgets/NoDataFound";
import { CreateProductFormPopupComponent } from "./create/ProductFormPopupComponent";
import TooltipCustomAnimation from "@/app/components/widgets/TooltipCustomAnimation";
import { AdminStoreProductHookDto } from "@/app/hooks/pages/administration/stores/products/useStoreProducts";
import ProductImageUploadComponent from "./create/ProductImageUploadComponent";

export function AdminStoreProductsComponent({
  adminProductHook,
}: {
  adminProductHook: AdminStoreProductHookDto;
}) {
  //

  const {
    products,
    isFetchingProduct,
    handleIsOpenStoreForm,
    uploadProductImage,
  } = adminProductHook;
  const [openAccordion, setOpenAccordion] = useState<number>(0);

  const storeItems = useMemo(() => {
    if (isFetchingProduct === true)
      return <StoreSkeleton isLoading={isFetchingProduct} count={3} />;
    if (!products || products.length === 0)
      return (
        <NoDataFound
          customClass="dark:shadow-none dark:bg-gray-800"
          message="Products not found"
        />
      );

    return products.map((item, index: number) => (
      <Accordion
        placeholder={""}
        open={openAccordion === item.id}
        key={index}
        className="border-b-2 dark:border-gray-800"
        animate={{
          mount: { scale: 1 },
          unmount: { scale: 0.9 },
        }}
      >
        <AccordionHeader
          placeholder={""}
          className="border-0"
          onClick={() => setOpenAccordion(item.id)}
        >
          <div className="flex w-full justify-between">
            <div className="flex gap-2 h-10 text-sm items-center dark:text-gray-100">
              <CustomNextImage
                width={50}
                height={50}
                src={item.image}
                alt={item.name}
                className="rounded-full object-cover"
              />
              <div className="">
                <h6 className="font-bold mb-1 line-clamp-1">{item.name}</h6>{" "}
                <span className="font-normal text-gray-600 line-clamp-1">
                  {item.productCategory.name}
                </span>
              </div>
            </div>
          </div>
        </AccordionHeader>
        <AccordionBody>
          <div className="w-full">
            <Card
              placeholder={""}
              className="w-full shadow-none max-w-[100%] p-8 dark:bg-gray-800 dark:text-gray-100"
            >
              <CardHeader
                placeholder={""}
                className="bg-transparent shadow-none text-right"
              >
                <TooltipCustomAnimation
                  content={<p className="text-xs">Edit Product</p>}
                >
                  <IconButton
                    size="sm"
                    placeholder={""}
                    className="rounded-full dark:bg-gray-700"
                  >
                    <PencilIcon className="h-3 w-3" />
                  </IconButton>
                </TooltipCustomAnimation>
              </CardHeader>
              <CardBody placeholder={""} className="p-0">
                <div className=" xs:grid lg:flex gap-5">
                  <ul className="flex flex-col gap-4 w-full">
                    <li className="flex items-center gap-4">
                      <span className="rounded-full border border-white/20 bg-white/20 p-1">
                        <CurrencyEuroIcon className="w-4 h-4" />
                      </span>
                      <Typography
                        placeholder={""}
                        className="font-normal text-sm"
                      >
                        Price: {item.price} / {item.priceUnit}{" "}
                        {item.priceUnitType}
                      </Typography>
                    </li>

                    <li className="flex items-center gap-4">
                      <span className="rounded-full border border-white/20 bg-white/20 p-1">
                        <CurrencyEuroIcon className="w-4 h-4" />
                      </span>
                      <Typography
                        placeholder={""}
                        as={"div"}
                        className="font-normal text-sm flex gap-2"
                      >
                        Quantity: {!item.isUnlimited ? item.quantity : ""}
                        <Chip
                          className="text-xs mt-[-2px]"
                          size="sm"
                          value={item.isUnlimited ? "Unlimited" : "Limited"}
                        />
                      </Typography>
                    </li>
                  </ul>
                  <div className="w-full">
                    <div dangerouslySetInnerHTML={{ __html: item.description }}>
                      {/* // */}
                    </div>
                  </div>
                </div>
                <div className="w-full flex mt-5">
                  <ProductImageUploadComponent
                    productRef={item.reference}
                    selectedImageFile={uploadProductImage}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </AccordionBody>
      </Accordion>
    ));
  }, [
    products,
    isFetchingProduct,
    openAccordion,
    uploadProductImage,
    setOpenAccordion,
  ]);

  return (
    <div className="dark:text-gray-100">
      {/* // */}
      <div className="">
        <Card
          placeholder={""}
          className="dark:bg-gray-900 w-full shadow-none pb-12 bg-transparent"
        >
          <CardHeader
            placeholder={""}
            className="mt-5 p-2 bg-transparent rounded-none shadow-none min-sm:flex justify-between"
          >
            <div className="mb-3 dark:text-gray-100">
              <Typography
                placeholder={""}
                variant="h6"
                className="py-3 gap-2 flex text-pink-400"
              >
                <ShoppingBagIcon className="w-5 h-5" /> Store Products
              </Typography>

              <Typography
                placeholder={""}
                variant="h6"
                className="uppercase text-sm"
              >
                Create a new product
              </Typography>
              <Typography placeholder={""} className="text-xs">
                Start your journey with a full online business
              </Typography>
            </div>
            <div>
              <Button
                onClick={handleIsOpenStoreForm}
                placeholder={""}
                className="text-xs flex gap-2"
                size="sm"
              >
                <PlusIcon className="h-4 w-3" /> new product
              </Button>
            </div>
          </CardHeader>
          <CardBody placeholder={""}>{storeItems}</CardBody>
        </Card>
      </div>
      {/* // */}

      <CreateProductFormPopupComponent adminProductHook={adminProductHook} />
    </div>
  );
}

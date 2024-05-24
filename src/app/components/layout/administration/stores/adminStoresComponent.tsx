import CustomNextLink from "@/app/components/widgets/customNextLink";
import TooltipCustomAnimation from "@/app/components/widgets/tooltipCustomAnimation";
import { AdminStoreHookDto } from "@/app/hooks/pages/administration/stores/useAdminStore";
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { range } from "@/app/lib/utils";
import { PlusIcon, ShoppingBagIcon } from "@heroicons/react/24/solid";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import {
  Accordion,
  AccordionHeader,
  AccordionBody,
} from "@material-tailwind/react";
import Image from "next/image";
import React from "react";
import { CreateStoreFormPopupComponent } from "./create/storeFormPopupComponent";

export function AdminStoresComponent({
  adminStoreHook,
}: {
  adminStoreHook: AdminStoreHookDto;
}) {
  //
  const { push } = useCustomRouter();
  const { handleIsOpenStoreForm } = adminStoreHook;

  return (
    <div className="p-4 dark:text-gray-100">
      {/* // */}
      <Typography
        placeholder={""}
        variant="h6"
        className="py-3 gap-2 flex px-5"
      >
        <ShoppingBagIcon className="w-5 h-5" /> Stores Management
      </Typography>
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
                className="uppercase text-sm"
              >
                Create a new store
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
                <PlusIcon className="h-4 w-3" /> new store
              </Button>
            </div>
          </CardHeader>
          <CardBody placeholder={""}>
            {range(1, 2).map((value: number, index: number) => (
              <Accordion
                placeholder={""}
                open={true}
                key={index}
                className="border-b-2 dark:border-gray-800"
              >
                <AccordionHeader placeholder={""} className="border-none">
                  <div className="flex w-full justify-between">
                    <div className="flex gap-2 h-10 text-sm items-center dark:text-gray-100">
                      <Image
                        width={50}
                        height={50}
                        src={"/marketplace-hero.jpg"}
                        alt=""
                        className="rounded-lg object-cover"
                      />
                      Store alpha zone {value}
                    </div>
                    <div>
                      <CustomNextLink href={"#"} className="text-xs underline dark:text-gray-300">
                        <TooltipCustomAnimation
                          content={<p className="text-xs">Store Products</p>}
                        >
                          Manage
                        </TooltipCustomAnimation>
                      </CustomNextLink>
                    </div>
                  </div>
                </AccordionHeader>
                <AccordionBody>
                 <div className="dark:text-gray-100">
                 We&apos;re not always in the position that we want to be at..
                 </div>
                </AccordionBody>
              </Accordion>
            ))}
          </CardBody>
        </Card>
      </div>
      {/* // */}

      <CreateStoreFormPopupComponent adminStoreHook={adminStoreHook} />
    </div>
  );
}

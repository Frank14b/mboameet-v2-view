import React from "react";
import InputField from "@/app/components/widgets/InputField";
import MultiLineInputField from "@/app/components/widgets/MultiLineInputField";
import { AdminStoreProductHookDto } from "@/app/hooks/pages/administration/stores/products/useStoreProducts";
import SelectFilterField from "@/app/components/widgets/SelectFilterField";
import { range } from "@/app/lib/utils";
import { priceUnitTypes } from "@/app/lib/constants/app";
import SwitchToggle from "@/app/components/widgets/SwitchToggle";

export function CreateStoreFirstStepComponent({
  adminProductHook,
}: {
  adminProductHook: AdminStoreProductHookDto;
}) {
  return (
    <>
      <div className="flex gap-3">
        <div className="w-full">
          <SelectFilterField
            data={{
              title: "Category",
              name: "productCategoryId",
              apiSearch: true,
              // options: storeTypes,
              // searchCallback: handleGetstoreTypes,
            }}
          />
        </div>
        <div className="w-full">
          <InputField
            data={{
              title: "Product Name",
              name: "name",
            }}
          />
        </div>
      </div>
      <br />

      <MultiLineInputField
        data={{
          title: "Product Description",
          name: "description",
          multiple: true,
        }}
      />
      <br />

      <div className="flex gap-3">
        <div className="w-full">
          <InputField
            data={{
              title: "Product Price",
              name: "price",
              type: "number",
            }}
          />
        </div>
        <div className="w-full w-[20rem]">
          <SelectFilterField
            data={{
              title: "Price Unit",
              name: "priceUnit",
              placeholder: "1, 2, 3, 4",
              apiSearch: false,
              options: range(1, 30).map((range) => {
                return {
                  label: `${range}`,
                  value: `${range}`,
                };
              }),
            }}
          />
        </div>
        <div className="w-full w-[20rem]">
          <SelectFilterField
            data={{
              title: "Unit Type",
              name: "priceUnitType",
              placeholder: "kg, liter, gram",
              apiSearch: false,
              options: priceUnitTypes.map((type) => {
                return {
                  label: `${type}`,
                  value: `${type}`,
                };
              }),
            }}
          />
        </div>
      </div>
      <br />

      <div className="flex gap-3">
        <div className="w-full">
        <InputField
            data={{
              title: "Available Quantity",
              name: "quantity",
              type: "number",
            }}
          />
        </div>
        <div className="w-full">
          <SwitchToggle data={{
            title: "Is Unlimited",
            name: "isUnlimited",
            subTitle: "The maximum quantity will be unlimited",
          }} />
        </div>
      </div>
    </>
  );
}

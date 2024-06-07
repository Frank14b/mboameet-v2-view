import React from "react";
import InputField from "@/app/components/widgets/InputField";
import MultiLineInputField from "@/app/components/widgets/MultiLineInputField";
import { AdminStoreProductHookDto } from "@/app/hooks/pages/administration/stores/products/useStoreProducts";
import SelectFilterField from "@/app/components/widgets/SelectFilterField";

export function CreateStoreFirstStepComponent({
  adminProductHook,
}: {
  adminProductHook: AdminStoreProductHookDto;
}) {

  return (
    <>
      <InputField
        data={{
          title: "Store Name",
          name: "name",
        }}
      />
      <br />

      <MultiLineInputField
        data={{
          title: "Store Description",
          name: "description",
          multiple: true,
        }}
      />
      <br />

      <div className="flex gap-3">
        <div className="w-full">
          <SelectFilterField
            data={{
              title: "Store Type",
              name: "storeTypeId",
              placeholder: "City, State, and Area",
              apiSearch: true,
              // options: storeTypes,
              // searchCallback: handleGetstoreTypes,
            }}
          />
        </div>
        <div className="w-full">
          <SelectFilterField
            data={{
              title: "Store Currency",
              name: "currencyId",
              placeholder: "Choose your currency",
              apiSearch: false,
              // options: currencies
            }}
          />
        </div>
      </div>
    </>
  );
}

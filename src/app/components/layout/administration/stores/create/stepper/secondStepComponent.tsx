import React, { useCallback, useMemo, useState } from "react";

import InputField from "@/app/components/widgets/inputField";
import { AdminStoreHookDto } from "@/app/hooks/pages/administration/stores/useAdminStore";
import CountrySelectField from "@/app/components/widgets/countrySelectField";

export function CreateStoreSecondStepComponent({
  adminStoreHook,
}: {
  adminStoreHook: AdminStoreHookDto;
}) {
  return (
    <>
      <div className="flex gap-3">
        <div className="w-full">
          <CountrySelectField
            data={{
              title: "Select Country",
              name: "country",
            }}
          />
        </div>
        <div className="w-full">
          <InputField
            data={{
              title: "City",
              name: "city",
              placeholder: "City, State",
            }}
          />
        </div>
      </div>
      <br />

      <div className="flex gap-3">
        <InputField
          data={{
            title: "Website",
            name: "website",
            placeholder: "https://",
            type: "url",
          }}
        />
        <InputField
          data={{
            title: "Email Address",
            name: "email",
            placeholder: "store@example.com",
            type: "email",
          }}
        />
      </div>
      <br />

      <div className="flex gap-3">
        <div className="w-full">
          <InputField
            data={{
              title: "Address",
              name: "address",
              placeholder: "Address, and Area",
            }}
          />
        </div>
        <div className="w-full">
          <InputField data={{ title: "Phone Number", name: "phoneNumber" }} />
        </div>
      </div>
    </>
  );
}

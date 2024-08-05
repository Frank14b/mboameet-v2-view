import * as yup from "yup";

export const CreateStoreSchema = yup.object({
  id: yup.number().notRequired(),
  name: yup.string().min(2, "Must be at least 2 characters").required(),
  description: yup.string().required("Provide some notes about the store"),
  address: yup.string().required("Address is required"),
  city: yup.string().required("Address City is required"),
  phoneNumber: yup
    .number()
    .nullable()
    .integer()
    .required("Phone number is required"),
  storeTypeId: yup.number().required("Store Type is required"),
  currencyId: yup.number().required("Currency Selection is required"),
  callingCode: yup.string().notRequired(),
  country: yup.object().required("Country selection is required"),
  website: yup.string().notRequired(),
  photo: yup
    .mixed()
    .test("requiredLogo", "Store logo is required", (value, context) => {
      if (context.parent.id && context.parent.id != 0) {
        return true;
      } else {
        return !!value;
      }
    })
    .nullable(),
});
import * as yup from "yup";

export const CreateProductSchema = yup.object({
  id: yup.number().notRequired(),
  name: yup.string().min(2, "Must be at least 2 characters").required(),
  description: yup.string().required("Provide some details about the product"),
  productCategoryId: yup.number().required("Category is required"),
  price: yup.number().min(0).required("Price is required"),
  priceUnit: yup.number().min(1).required("Unit is required"),
  priceUnitType: yup.string().required("Unit type is required"),
  quantity: yup.number().min(0).required("Quantity is required"),
  photo: yup
    .mixed()
    .test("requiredLogo", "Product photo is required", (value, context) => {
      if (context.parent.id && context.parent.id != 0) {
        return true;
      } else {
        return !!value;
      }
    })
    .nullable(),
});

import * as yup from "yup";

export const CreateProductSchema = yup.object({
  name: yup.string().min(2, "Must be at least 2 characters").required(),
  description: yup.string().required("Provide some notes about the store"),
  productCategoryId: yup.number().required("Category is required"),
  price: yup.number().min(0).required("Price is required"),
  priceUnit: yup.number().min(1).required("Unit is required"),
  priceUnitType: yup.string().required("Unit type is required"),
  quantity: yup.number().min(0).required("Quantity is required"),
  photo: yup.mixed().required('File is required'),
});

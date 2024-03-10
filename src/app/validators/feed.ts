import * as yup from "yup";

export const CreateFeedSchema = yup.object({
    message: yup.string().min(2).required("Content is required"),
});
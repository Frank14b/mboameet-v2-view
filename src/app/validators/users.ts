import * as yup from "yup";

export const signInSchema = yup.object({
    username: yup.string().required("User name is required"),
    password: yup.string().required("Password is required")
});

export const signUpSchema = yup.object({
    username: yup.string().required("User name is required"),
    password: yup.string().required("Password is required")
});
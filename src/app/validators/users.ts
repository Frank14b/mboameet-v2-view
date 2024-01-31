import * as yup from "yup";
import { invalidEmailErrorMessage, passwordErrorMessage, passwordRegex, requiredEmailErrorMessage } from "../lib/utils";

export const signInSchema = yup.object({
    username: yup.string().min(2).required("User name is required"),
    password: yup.string().matches(new RegExp(passwordRegex), {
        message: passwordErrorMessage
    }).required("Password is required")
});

export const signUpSchema = yup.object({
    username: yup.string().min(2).required("User name is required"),
    firstname: yup.string().notRequired(),
    lastname: yup.string().notRequired(),
    email: yup.string().email(invalidEmailErrorMessage).required(requiredEmailErrorMessage),
    phone: yup.number().positive().integer().required("Phone number is required"),
    countryCode: yup.string().notRequired(),
    password: yup.string().matches(new RegExp(passwordRegex), {
        message: passwordErrorMessage
    }).required("Password is required"),
    confirmpassword: yup.string().matches(new RegExp(passwordRegex), {
        message: passwordErrorMessage
    }).oneOf([yup.ref("password")], "Passwords must be same").required("Confirm password is required")
});

export const forgetPasswordSchema = yup.object({
    email: yup.string().email(invalidEmailErrorMessage).required(requiredEmailErrorMessage),
})
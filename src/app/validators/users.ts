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
    phone: yup.number().positive().nullable().integer().required("Phone number is required"),
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

export const verifyOtpCodeSchema = yup.object({
    otp: yup.number().min(6).required("OTP code is required"),
    token: yup.string().default("xxx"),
    type: yup.number().default(0)
})

export const changePasswordSchema = yup.object({
    password: yup.string().matches(new RegExp(passwordRegex), {
        message: passwordErrorMessage
    }).required("Password is required"),
    confirmpassword: yup.string().matches(new RegExp(passwordRegex), {
        message: passwordErrorMessage
    }).oneOf([yup.ref("password")], "Passwords must be same").required("Confirm password is required"),
    token: yup.string().default("xxx"),
})

export const UpdateProfileSchema = yup.object({
    // userName: yup.string().notRequired(),
    firstName: yup.string().notRequired(),
    lastName: yup.string().notRequired(),
    email: yup.string().email(invalidEmailErrorMessage).required(requiredEmailErrorMessage),
    // phone: yup.number().positive().nullable().integer().required("Phone number is required"),
    // countryCode: yup.string().notRequired(),
    password: yup.string().matches(new RegExp(passwordRegex), {
        message: passwordErrorMessage
    }).required("Current password is required")
})
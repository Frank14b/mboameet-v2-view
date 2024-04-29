import * as yup from "yup";
import {
  invalidEmailErrorMessage,
  passwordErrorMessage,
  passwordRegex,
  requiredEmailErrorMessage,
} from "../lib/constants/app";
import { validPhoneNumber } from "../lib/utils";

export const signInSchema = yup.object({
  userName: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .required("User name is required"),
  password: yup
    .string()
    .matches(new RegExp(passwordRegex), {
      message: passwordErrorMessage,
    })
    .required("Password is required"),
});

export const signUpSchema = yup.object({
  userName: yup
    .string()
    .min(2, "Must be at least 2 characters")
    .required("User name is required"),
  firstName: yup.string().notRequired(),
  lastName: yup.string().notRequired(),
  email: yup
    .string()
    .email(invalidEmailErrorMessage)
    .required(requiredEmailErrorMessage),
  country: yup.object().required(),
  phone: yup
    .string()
    .min(1, "Phone number is required")
    .required("Phone number is required")
    .test(
      "format",
      "Phone number should only contain numbers",
      (value) => validPhoneNumber(value)
    ),
  countryCode: yup.string().notRequired(),
  password: yup
    .string()
    .matches(new RegExp(passwordRegex), {
      message: passwordErrorMessage,
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .matches(new RegExp(passwordRegex), {
      message: passwordErrorMessage,
    })
    .oneOf([yup.ref("password")], "Passwords must be same")
    .required("Confirm password is required"),
});

export const forgetPasswordSchema = yup.object({
  email: yup
    .string()
    .email(invalidEmailErrorMessage)
    .required(requiredEmailErrorMessage),
});

export const verifyOtpCodeSchema = yup.object({
  otp: yup
  .string()
  .min(6, "OTP code should be 6 digits")
  .max(6, "OTP code should be 6 digits")
  .required("OTP code is required")
  .test(
    "format",
    "OTP code should only contain numbers",
    (value) => validPhoneNumber(value)
  ),
  token: yup.string().default("xxx"),
  type: yup.number().default(0),
  accessToken: yup.string().required("Access token is required")
});

export const changePasswordSchema = yup.object({
  password: yup
    .string()
    .matches(new RegExp(passwordRegex), {
      message: passwordErrorMessage,
    })
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .matches(new RegExp(passwordRegex), {
      message: passwordErrorMessage,
    })
    .oneOf([yup.ref("password")], "Passwords must be same")
    .required("Confirm password is required"),
  token: yup.string().default("xxx"),
});

export const UpdateProfileSchema = yup.object({
  // userName: yup.string().notRequired(),
  firstName: yup.string().notRequired(),
  lastName: yup.string().notRequired(),
  email: yup
    .string()
    .email(invalidEmailErrorMessage)
    .required(requiredEmailErrorMessage),
  // phone: yup.number().positive().nullable().integer().required("Phone number is required"),
  // countryCode: yup.string().notRequired(),
  password: yup
    .string()
    .matches(new RegExp(passwordRegex), {
      message: passwordErrorMessage,
    })
    .required("Current password is required"),
});

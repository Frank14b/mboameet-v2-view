import { ToastContent, ToastOptions, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ApiResponseDto } from "../types";

const defaultOptions: ToastOptions = {
  position: "bottom-right",
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const notifySuccess = (content: ToastContent) => {
  return toast.success(content ?? "Wow so easy!", defaultOptions);
};

const notifyError = (content: ToastContent) =>
  toast.error(content ?? "Wow so easy!", defaultOptions);

const notifyWarning = (content: ToastContent) =>
  toast.warning(content ?? "Wow so easy!", defaultOptions);

const apiNotify = <T>(data: ApiResponseDto<T | any>) => {
  if (data?.status) {
    const message = data?.data?.message ?? data.message;
    notifySuccess(message);
  } else if (data.statusCode == 4040) {
    notifyError("Please verify your internet connection");
  } else {
    notifyError(data.message);
  }
};

export const notification = {
  apiNotify,
  notifySuccess,
  notifyError,
  notifyWarning,
};

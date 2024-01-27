export * from "./authentication";
export * from "./widget";

export type RequestMethod = "POST"|"GET"|"DELETE"|"PUT"|"PATCH";

export type ApiResponseDto = {
    status: boolean,
    message: string,
    data?: any
}
export * from "./authentication";
export * from "./widget";
export * from "./user";

export type RequestMethod = "POST"|"GET"|"DELETE"|"PUT"|"PATCH";

export type ApiResponseDto<T> = {
    status: boolean,
    message: string,
    data?: T
}

export type BooleanResultDto<T> = {
    status: boolean,
    message: string,
    data?: Array<T> | object | string | number | undefined | T | ObjectKeyDto
}

export type ObjectKeyDto = {[key: string]: any}
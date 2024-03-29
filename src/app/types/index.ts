export * from "./authentication";
export * from "./widget";
export * from "./user";
export * from "./feed";

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

export type ResultPaginate<T> = {
    data: T,
    skip: number,
    limit: number,
    total: number,
    sort: string
}

export type ObjectKeyDto = {[key: string]: any}

export type EmojiSelected = { emoji: string; emojiUrl: string }
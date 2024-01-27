import { HTMLInputTypeAttribute } from "react";

export type InpputFormComponent = {
    title: string,
    name?: string,
    type?: HTMLInputTypeAttribute,
    id?: string,
    onChange?: (e: React.FormEvent<HTMLInputElement>) => void,
    value?: string,
    defaultValue?: string | number,
    placeholder?: string,
};
import { useState } from "react";

import { InpputFormComponent } from "@/app/types/index";
import { UseFormRegister } from "react-hook-form";

export default function InputFormComponent(
    {
        data,
        register,
        error }: {
            data: InpputFormComponent & { [key: string]: any },
            register: UseFormRegister<any>,
            error?: any
        }) {

    const [inputValue, setInputValue] = useState<string | undefined>(data?.value)

    // const onValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    //     setInputValue(e.currentTarget.value)
    //     data?.onChange(e)
    // }

    return <>
        <div className="w-full">
            <label htmlFor={data?.id ?? data.title.toLowerCase()} className="block text-sm font-medium leading-6 text-gray-900">
                {data.title}
            </label>
            <div className="mt-2">
                <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-full">
                    <input
                        type={data?.type ?? "text"}
                        id={data?.id ?? data.title.toLowerCase()}
                        autoComplete={data.title}
                        className="block border-0 w-full bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={data?.placeholder ?? data?.name ?? data.title}
                        // onChange={(e: React.FormEvent<HTMLInputElement>) => onValueChange(e)}
                        value={inputValue}
                        defaultValue={data?.defaultValue}
                        {...register(`${data?.name?.toLowerCase() ?? data.title.toLowerCase()}`)}
                    />
                </div>
            </div>
        </div>

        {error && <span className='text-red-500'>{error?.message}</span>}
    </>
}
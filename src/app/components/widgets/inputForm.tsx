import { useState } from "react";

import { InpputFormComponent } from "@/app/types/index";
import { UseFormRegister } from "react-hook-form";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline'
import { Input } from "@material-tailwind/react";

export default function InputFormComponent(
    {
        data,
        register,
        error }: {
            data: InpputFormComponent & { [key: string]: any },
            register: UseFormRegister<any>,
            error?: any
        }) {

    const [type, setType] = useState(data?.type ?? "text");

    const switchPasswordType = () => {
        if (type == "password") {
            setType("text");
        } else {
            setType("password");
        }
    }

    // const [inputValue, setInputValue] = useState<string | undefined>(data?.value)
    // const onValueChange = (e: React.FormEvent<HTMLInputElement>) => {
    //     setInputValue(e.currentTarget.value)
    //     data?.onChange(e)
    // }

    return <>
        <div className="w-full">
            {/* <label htmlFor={data?.id ?? data.title.toLowerCase()} className="block text-sm font-medium leading-6 text-gray-900">
                {data.title}
            </label> */}
            <div className="mt-2">
                <div className={`rounded-md relative ${error && "border-2 border-rose-500"} shadow-sm ring-1 ring-inset ring-gray-300 w-full`}>
                    <Input
                        error={error ? true : false}
                        crossOrigin={""}
                        type={type}
                        label={data.title}
                        id={data?.id ?? data.title.toLowerCase()}
                        autoComplete={data.title}
                        className="block border-0 w-full bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={data?.placeholder ?? data?.name ?? data.title}
                        defaultValue={data?.defaultValue}
                        {...register(`${data?.name?.toLowerCase() ?? data.title.toLowerCase()}`)}
                    />
                    {
                        data?.type == "password" && <span className="password-eye" onClick={switchPasswordType}>
                            {
                                type == "text" ? <EyeIcon className="w-4 h-4" aria-hidden="true" /> : <EyeSlashIcon className="w-4 h-4" aria-hidden="true" />
                            }
                        </span>
                    }
                </div>
            </div>
        </div>

        {error && <span className='text-red-500 text-sm'>{error?.message}</span>}
    </>
}
import { HTMLInputTypeAttribute, useState } from "react";

type InpputFormComponent = {
    title: string,
    name?: string,
    type?: HTMLInputTypeAttribute,
    id?: string,
    onChange: (e: React.FormEvent<HTMLInputElement>) => void,
    value?: string,
    defaultValue?: string | number,
    placeholder?: string
};

export default function InputFormComponent({ data }: { data: InpputFormComponent }) {

    const [inputValue, setInputValue] = useState<string | undefined>(data?.value)

    const onValueChange = (e: React.FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
        data.onChange(e)
    }

    return <>
        <div className="w-full">
            <label htmlFor={data?.id ?? data.title.toLowerCase()} className="block text-sm font-medium leading-6 text-gray-900">
                {data.title}
            </label>
            <div className="mt-2">
                <div className="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-full">
                    <input
                        type={data?.type ?? "text"}
                        name={data?.name ?? data.title.toLowerCase()}
                        id={data?.id ?? data.title.toLowerCase()}
                        autoComplete={data.title}
                        className="block border-0 w-full bg-transparent py-1.5 pl-2 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder={data?.placeholder}
                        onChange={(e: React.FormEvent<HTMLInputElement>) => onValueChange(e)}
                        value={inputValue}
                        defaultValue={data?.defaultValue}
                    />
                </div>
            </div>
        </div>
    </>
}
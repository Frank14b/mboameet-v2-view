import {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useState,
} from "react";
import { Option, Select } from "@material-tailwind/react";
import useFormStore from "@/app/store/formStore";
import { UseFormReturn } from "react-hook-form";
import Image from "next/image";
import { ObjectKeyDto } from "@/app/types";

export interface SelectFieldProps {
  title: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  value?: string;
  placeholder?: string;
  options: {
    label: string;
    value: string;
    customValue?: ObjectKeyDto | string | number;
    image?: string;
  }[];
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function SelectField({
  data,
}: {
  data: SelectFieldProps & { [key: string]: any };
}) {
  const { reactHookUseForm } = useFormStore();
  const { register, formState, setValue, watch } =
    (reactHookUseForm as UseFormReturn<any>) ?? {};
  const { errors } = formState ?? {};
  const [error, setError] = useState<any>(null);
  const fieldKey = data?.name ?? data.title.toLowerCase();
  const { name } = register?.(`${fieldKey}`) ?? {};

  const watchField = watch?.(`${fieldKey}`);

  const checkError = useCallback(() => {
    if (errors?.[fieldKey]) {
      setError(errors[fieldKey]);
    } else {
      setError(null);
    }
  }, [errors, fieldKey]);

  useEffect(() => {
    checkError();
  }, [watchField, checkError]);

  const handleOnChange = (value: any) => {
    const item = data.options.find((options) => options.value === value);
    if (item?.customValue) {
      value = item.customValue;
    }

    setValue(`${fieldKey}`, value, {
      shouldValidate: true,
    });
  };

  if (!reactHookUseForm) return <></>;

  return (
    <>
      <div className="w-full">
        <div className="mt-2">
          <div
            className={`rounded-md relative shadow-sm ring-0 ring-inset ring-gray-700 w-full`}
          >
            <Select
              size="lg"
              error={error ? true : false}
              id={data?.id ?? data.title.toLowerCase()}
              label={data.title}
              className={`block customSelect border-0 w-full bg-transparent py-1.5 pl-2 ${
                data?.type == "password" ? "pr-8" : ""
              } text-gray-900 placeholder:text-gray-400 dark:text-gray-100 ring-0 sm:text-sm sm:leading-6`}
              placeholder={data?.placeholder ?? data.title}
              onChange={handleOnChange}
              name={name}
            >
              {data?.options?.map(({ label, value, image }) => (
                <Option
                  key={value}
                  value={value}
                  className="flex items-center gap-2"
                >
                  {image && (
                    <Image
                      src={image}
                      alt={label}
                      height={50}
                      width={50}
                      className="h-5 w-5 rounded-full object-cover"
                    />
                  )}
                  {label}
                </Option>
              ))}
            </Select>
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm px-1 mt-2">{error?.message}</div>
      )}
    </>
  );
}

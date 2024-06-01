import {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { Option, Select } from "@material-tailwind/react";
import useFormStore from "@/app/store/formStore";
import { UseFormReturn } from "react-hook-form";
import { ObjectKeyDto } from "@/app/types";
import { useCountries } from "use-react-countries";
import { dynamicSort } from "@/app/lib/utils";
import CustomNextImage from "./CustomNextImage";

export interface SelectFieldProps {
  title: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  value?: string;
  placeholder?: string;
  options?: {
    label: string;
    value: string;
    customValue?: ObjectKeyDto | string | number;
    image?: string;
  }[];
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function CountrySelectField({
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
  const [defaultSelected, setDefaultSelected] = useState<string>("");

  const { countries } = useCountries();

  const formattedCountries = useMemo(() => {
    const sortedCountries = countries.sort(dynamicSort("name"));
    return sortedCountries.map((country) => {
      return {
        label: country.name,
        value: country.name,
        image: country.flags.svg,
        customValue: {
          name: country.name,
          callingCode: country.countryCallingCode,
        },
      };
    });
  }, [countries]);

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

    if (watchField) {
      const item = formattedCountries.find(
        (options) => options.value === (watchField?.name ?? watchField)
      );
      setDefaultSelected(item?.value ?? "");
    }
  }, [watchField, formattedCountries, checkError, setDefaultSelected]);

  const handleOnChange = (value: any) => {
    const item = formattedCountries.find((options) => options.value === value);
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
              className={`block customSelect w-full bg-transparent py-1.5 pl-2 ${
                data?.type == "password" ? "pr-8" : ""
              } text-gray-900 placeholder:text-gray-400 dark:text-gray-100 ring-0 sm:text-sm sm:leading-6`}
              placeholder={data?.placeholder ?? data.title}
              onChange={handleOnChange}
              name={name}
              value={defaultSelected}
              animate={{
                mount: { y: 0 },
                unmount: { y: 25 },
              }}
            >
              {formattedCountries?.map(({ label, value, image }) => (
                <Option
                  key={value}
                  value={value}
                  className="flex items-center gap-2"
                >
                  {image && (
                    <CustomNextImage
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

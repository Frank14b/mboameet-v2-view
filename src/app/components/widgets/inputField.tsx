import {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useState,
} from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";
import { Input } from "@material-tailwind/react";
import useFormStore from "@/app/store/formStore";
import { UseFormReturn } from "react-hook-form";

export interface InputFieldProps {
  title: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  value?: string;
  placeholder?: string;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function InputField({
  data,
}: {
  data: InputFieldProps & { [key: string]: any };
}) {
  const [type, setType] = useState(data?.type ?? "text");
  const { reactHookUseForm } = useFormStore();
  const { register, formState, setValue, watch } =
    (reactHookUseForm as UseFormReturn<any>) ?? {};
  const { errors } = formState ?? {};
  const [error, setError] = useState<any>(null);
  const fieldKey = data?.name ?? data.title.toLowerCase();

  const switchInputType = useCallback(() => {
    if (type == "password") {
      setType("text");
    } else {
      setType("password");
    }
  }, [type]);

  const watchField = watch?.(`${fieldKey}`);

  const checkError = useCallback(() => {
    if (errors?.[fieldKey]) {
      setError(errors[fieldKey]);
    } else {
      setError(null);
    }
  }, [errors]);

  useEffect(() => {
    checkError();
  }, [watchField]);

  const handleOnChange = (e: any) => {
    setValue(`${fieldKey}`, e.target.value, {
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
            <Input
              //   variant={"static"}
              error={error ? true : false}
              crossOrigin={""}
              type={type}
              id={data?.id ?? data.title.toLowerCase()}
              autoComplete={data.title}
              label={data.title}
              className={`block border-0 w-full bg-transparent py-1.5 pl-2 ${
                data?.type == "password" ? "pr-8" : ""
              } text-gray-900 placeholder:text-gray-400 dark:text-gray-100 ring-0 sm:text-sm sm:leading-6`}
              placeholder={data?.placeholder ?? data.title}
              {...register(`${fieldKey}`, { onChange: handleOnChange })}
            />
            {data?.type == "password" && (
              <span className="password-eye" onClick={switchInputType}>
                {type == "text" ? (
                  <EyeIcon className="w-4 h-4" aria-hidden="true" />
                ) : (
                  <EyeSlashIcon className="w-4 h-4" aria-hidden="true" />
                )}
              </span>
            )}
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm px-1 mt-2">{error?.message}</div>
      )}
    </>
  );
}

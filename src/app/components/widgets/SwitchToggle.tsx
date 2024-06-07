import { useCallback, useEffect, useState } from "react";
import { Switch, Typography } from "@material-tailwind/react";
import useFormStore from "@/app/store/formStore";
import { UseFormReturn } from "react-hook-form";

export interface SwitchFieldProps {
  title: string;
  name?: string;
  id?: string;
  subTitle?: string;
}

export default function SwitchToggle({
  data,
}: {
  data: SwitchFieldProps & { [key: string]: any };
}) {
  const { reactHookUseForm } = useFormStore();
  const { register, formState, setValue, watch } =
    (reactHookUseForm as UseFormReturn<any>) ?? {};
  const { errors } = formState ?? {};
  const [error, setError] = useState<any>(null);
  const fieldKey = data?.name ?? data.title.toLowerCase();

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

  const handleOnChange = (e: any) => {
    setValue(`${fieldKey}`, e.target.checked);
  };

  if (!reactHookUseForm) return <></>;

  return (
    <>
      <div className="w-full">
        <div className="mt-2 relative">
          <Switch
            {...register(`${fieldKey}`, { onChange: handleOnChange })}
            crossOrigin={""}
            color="green"
            label={
              <div>
                <Typography
                  placeholder={""}
                  color="blue-gray"
                  className="font-medium"
                >
                  {data.title}
                </Typography>

                {data?.subTitle && (
                  <Typography
                    placeholder={""}
                    variant="small"
                    color="gray"
                    className="font-normal"
                  >
                    {data?.subTitle}
                  </Typography>
                )}
              </div>
            }
            containerProps={{
              className: "-mt-5",
            }}
          />
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm px-1 mt-2">{error?.message}</div>
      )}
    </>
  );
}

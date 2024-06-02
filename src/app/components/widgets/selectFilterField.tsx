import {
  HTMLInputTypeAttribute,
  useCallback,
  useEffect,
  useState,
} from "react";
import {
  Menu,
  MenuHandler,
  Button,
  MenuList,
  MenuItem,
  Input,
  Spinner,
} from "@material-tailwind/react";
import useFormStore from "@/app/store/formStore";
import { UseFormReturn } from "react-hook-form";
import { ObjectKeyDto } from "@/app/types";
import CustomNextImage from "./CustomNextImage";
import { debounce } from "@/app/lib/utils";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export type TypeOptionsProps = {
  label: string;
  value: string;
  customValue?: ObjectKeyDto | string | number;
  image?: string;
};

export interface SelectFieldProps {
  title: string;
  name?: string;
  type?: HTMLInputTypeAttribute;
  id?: string;
  value?: string;
  placeholder?: string;
  options?: TypeOptionsProps[];
  apiSearch?: boolean;
  searchCallback?: (keyword: string) => Promise<void>;
  onChange?: (e: React.FormEvent<HTMLInputElement>) => void;
}

export default function SelectFilterField({
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
  const [dataOptions, setDataOptions] = useState<TypeOptionsProps[]>(
    data.options ?? []
  );
  const [isFiltering, setIsFiltering] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>("");

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

    if (watchField && dataOptions.length > 0) {
      const item = dataOptions.find((options) => options.value === watchField);
      if (item) {
        setSelectedValue(item.label);
      }
    }
  }, [watchField, dataOptions, checkError]);

  const handleOnChange = useCallback(
    (value: any) => {
      if (!dataOptions) return;
      const item = dataOptions.find((options) => options.value === value);
      if (item?.customValue) {
        value = item.customValue;
      }

      setValue(`${fieldKey}`, value, {
        shouldValidate: true,
      });
      setIsOpen(!isOpen);
    },
    [fieldKey, isOpen, dataOptions, setValue, setIsOpen]
  );

  const proceedApiSearch = useCallback(
    (keyword: string) => {
      setIsFiltering(true);

      if (data.apiSearch) {
        data.searchCallback?.(keyword).then((res) => {
          setIsFiltering(false);
        });
      } else {
        const filteredData = data.options?.filter((option) =>
          option.label.toLowerCase().includes(keyword?.toLowerCase())
        );
        setDataOptions(filteredData ?? []);
        setIsFiltering(false);
      }
    },
    [data, setDataOptions, setIsFiltering]
  );

  const handleFilter = useCallback(
    (event: any) => {
      const keyword = event.target.value;
      if (keyword) {
        debounce(proceedApiSearch, 1000, keyword as string);
      }
    },
    [proceedApiSearch]
  );

  useEffect(() => {
    if (data.options) {
      setDataOptions(data.options);
    }
  }, [data.options, setDataOptions]);

  if (!reactHookUseForm) return <></>;

  return (
    <>
      <div className="w-full">
        <div className="mt-2">
          <div
            className={`rounded-md relative ring-0 ring-inset ring-gray-700 w-full`}
          >
            <Menu
              dismiss={{
                itemPress: false,
              }}
              open={isOpen}
              handler={setIsOpen}
              allowHover
            >
              <MenuHandler>
                <div className="gap-3">
                  <Button
                    variant="outlined"
                    className={`flex justify-between border-gray-500 text-sm font-normal normal-case ${
                      error ? "border-red-600 text-red-600" : ""
                    } ${"w-full text-left"}`}
                    placeholder={""}
                    size="sm"
                  >
                    {selectedValue ? selectedValue : data.title}{" "}
                    <ChevronDownIcon
                      strokeWidth={2.5}
                      className={`h-3.5 w-3.5 transition-transform ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Button>
                </div>
              </MenuHandler>
              <MenuList
                className="z-[999999999] min-w-[350px]"
                placeholder={""}
              >
                <Input
                  crossOrigin=""
                  placeholder={`Search ${data.title}`}
                  type={"text"}
                  name={`filter-${name}`}
                  onChange={handleFilter}
                  className="bg-white border-0 ring-0"
                />
                {isFiltering && (
                  <div className="justify-center grid py-3">
                    <Spinner className="w-5 h-5" />
                  </div>
                )}

                {dataOptions?.map(
                  ({ label, value, image }, index) =>
                    index < 30 && (
                      <MenuItem
                        key={`${index}-${value}`}
                        placeholder={""}
                        className={`flex items-center gap-2 ${watchField == value ? "bg-gray-200" : ""}`}
                        onClick={() => handleOnChange(value)}
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
                      </MenuItem>
                    )
                )}
              </MenuList>
            </Menu>
          </div>
        </div>
      </div>
      {error && (
        <div className="text-red-500 text-sm px-1 mt-2">{error?.message}</div>
      )}
    </>
  );
}

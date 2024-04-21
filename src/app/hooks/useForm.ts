import { DefaultValues, UseFormReturn, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import useFormStore from "../store/formStore";
import { useEffect } from "react";

type FormValues = { [key: string]: any }; // Dynamic type for form values

interface UseFormProps<T extends FormValues> {
  schema: any; // Yup schema for validation
  defaultValues?: T | DefaultValues<T> | undefined; // Optional default values for the form
}

const useAppForm = <T extends FormValues>({
  schema,
  defaultValues,
}: UseFormProps<T>): UseFormReturn<T> => {

  const { setReactHookUseForm } = useFormStore();

  const hookForm = useForm({
    // mode: "all",
    resolver: yupResolver(schema) as any, // Integrate Yup for validation
    defaultValues: defaultValues as DefaultValues<T> | undefined,
    reValidateMode: "onChange",
  });

  useEffect(() => {
    setReactHookUseForm(hookForm);
  }, []);

  return hookForm;
};

export default useAppForm;

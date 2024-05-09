// form store
import { create } from 'zustand';
import { FieldValues, UseFormReturn } from 'react-hook-form';

export interface StoreType<T extends FieldValues>{
  reactHookUseForm: UseFormReturn<T> | null;
  setReactHookUseForm: (useForm: UseFormReturn<T> | null) => void;
}

const useFormStore = create<StoreType<any>>()((set, get) => ({
  reactHookUseForm: null, // Initial state
  setReactHookUseForm: (useForm: UseFormReturn<any> | null) => set({ reactHookUseForm: useForm }), // Action to update
}));

export default useFormStore;

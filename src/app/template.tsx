"use client";

import { yupResolver } from "@hookform/resolvers/yup";
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  useForm,
} from "react-hook-form";
import { CreateFeedSchema } from "./validators";
import { ResultFeed } from "./types";

export default function Template({ children }: { children: React.ReactNode }) {
  //render the page
  return <HomeWrapper>{children}</HomeWrapper>;
}

const HomeContext = createContext<any>({});
export function HomeWrapper({ children }: { children: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreateFeedSchema), // Integrate Yup for validation
  });
  //
  const [openFeedForm, handleOpenFeedForm] = useState<boolean>(false);
  const [openFeedFormImages, handleOpenFeedFormImages] =
    useState<boolean>(false);
  const [updateFeedItem, setUpdateFeedItem] = useState<ResultFeed | null>(null);

  useEffect(() => {
    if(!openFeedForm) {
      setUpdateFeedItem(null);
    }
  }, [openFeedForm])

  const data: HomeContextDto = {
    isLoading,
    setIsLoading,
    register,
    handleSubmit,
    errors,
    openFeedForm,
    handleOpenFeedForm,
    openFeedFormImages,
    handleOpenFeedFormImages,
    updateFeedItem,
    setUpdateFeedItem
  };

  return (
    <HomeContext.Provider value={data}>
      {children}
    </HomeContext.Provider>
  );
}

export const useHomeContext = (): HomeContextDto =>
  useContext(HomeContext);

export type HomeContextDto = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  errors: FieldErrors<any>;
  openFeedForm: boolean;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  openFeedFormImages: boolean;
  handleOpenFeedFormImages: Dispatch<SetStateAction<boolean>>;
  updateFeedItem: ResultFeed | null;
  setUpdateFeedItem: Dispatch<SetStateAction<ResultFeed | null>>;
};

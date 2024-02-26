"use client";

import CropProfileImage from "@/app/components/layout/profile/cropProfileImage";
import { UpdateProfileFormComponent } from "@/app/components/layout/profile/updateProfile";
import { useAppHubContext } from "@/app/contexts/appHub";
import { proceedUpdateProfile } from "@/app/services";
import { ResultUpdateProfileData, UpdateProfileFormData, ApiResponseDto } from "@/app/types";
import { UpdateProfileSchema } from "@/app/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "@material-tailwind/react";
import {
  ChangeEvent,
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

export default function Template({ children }: { children: React.ReactNode }) {
  //render the page
  return <ProfileWrapper>{children}</ProfileWrapper>;
}

const ProfileContext = createContext<any>({});
export function ProfileWrapper({ children }: { children: any }) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [image, setImage] = useState<string | null>(null);
  const [openEditProfile, setOpenEditProfile] = useState<boolean>(false);
  const handleOpenEditProfile = () => setOpenEditProfile((cur) => !cur);
  const [requestData, setRequestData] =
    useState<ApiResponseDto<ResultUpdateProfileData> | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(UpdateProfileSchema), // Integrate Yup for validation
  });
   
  const appHubContext = useAppHubContext();

  const changeProfilePicture = async (data: ChangeEvent<HTMLInputElement>) => {
    if (!data?.target?.files?.[0]) return; // if no file found return immediately
    setImage(URL.createObjectURL(data.target.files[0]));
  };

  const editProfile = async (data: UpdateProfileFormData) => {
    setIsLoading(true);
    const result = await proceedUpdateProfile(data);
    setRequestData(result);
    setIsLoading(false);
    appHubContext.userHubs.updateProfile();

    if (result.status === true) {
      setValue("password", "");
      handleOpenEditProfile();
    }
  };

  const data: ProfileContextDto = {
    isLoading,
    setIsLoading,
    changeProfilePicture,
    editProfile,
    handleSubmit,
    register,
    errors,
    handleOpenEditProfile,
    requestData
  };

  return (
    <ProfileContext.Provider value={data}>
      <div className={``}>
        {children}

        {image && <CropProfileImage image={image} />}

        <Dialog
          placeholder={""}
          size="md"
          open={openEditProfile}
          handler={handleOpenEditProfile}
          className="bg-transparent shadow-none"
        >
          {" "}
          <UpdateProfileFormComponent />{" "}
        </Dialog>
      </div>
    </ProfileContext.Provider>
  );
}

export const useProfileContext = (): ProfileContextDto =>
  useContext(ProfileContext);

export type ProfileContextDto = {
  isLoading: boolean;
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  changeProfilePicture: any;
  editProfile: any;
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  errors: FieldErrors<any>;
  handleOpenEditProfile: () => void;
  requestData: ApiResponseDto<ResultUpdateProfileData> | null;
};

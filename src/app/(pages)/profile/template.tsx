"use client";

import CropProfileImage from "@/app/components/layout/profile/cropProfileImage";
import { UpdateProfileFormComponent } from "@/app/components/layout/profile/updateProfile";
import { useAppHubContext } from "@/app/contexts/appHub";
import { createFileUploadString } from "@/app/lib/utils";
import { proceedUpdateProfile, updateProfileImage } from "@/app/services";
import useUserStore from "@/app/store/userStore";
import { ResultUpdateProfileData, UpdateProfileFormData, ApiResponseDto, ObjectKeyDto } from "@/app/types";
import { UpdateProfileSchema } from "@/app/validators";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog } from "@material-tailwind/react";
import {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
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
  const { setUser } = useUserStore();
   
  const appHubContext = useAppHubContext();

  const changeProfilePicture = async (data: ChangeEvent<HTMLInputElement>) => {
    setImage(createFileUploadString(data));
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

  const uploadProfileImage = async (image: string | Blob| ObjectKeyDto) => {
    const formData = new FormData();

    const imageBlob: any = image;
    formData.append('image', imageBlob, 'profileImage.jpg');
    const result = await updateProfileImage(formData);

    if(result.status === true && result?.data) {
      setImage(null);
      setUser(result.data);
    }
  }

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

        {image && <CropProfileImage image={image} croppedImage={uploadProfileImage} returnType={'blob'} />}

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

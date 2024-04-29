import {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { notification } from "@/app/lib/notifications";
import { FriendsTypes, ResultFriendsDto } from "@/app/types/friends";
import {
  getFriends,
  proceedFollowFriend,
} from "@/app/services/server-actions/friends";
import { useMainContext } from "@/app/contexts/main";
import { ApiResponseDto } from "@/app/types";

const useFriends = () => {
  //
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [friends, setFriends] = useState<ResultFriendsDto[] | []>([]);
  const { getFileUrl } = useMainContext();

  const fetchFriends = useCallback(
    async ({ type }: { type: FriendsTypes }) => {
      //
      if (type != "recommended") return [];

      const result = await getFriends({
        revalidate: true,
      });

      setIsLoading(false);
      if (result.status && result?.data?.data) {
        setFriends(result.data.data);
        return result.data.data;
      }
    },
    [setIsLoading, setFriends]
  );

  useEffect(() => {
    fetchFriends({ type: "recommended" });
  }, [fetchFriends]);

  const formattedFriends = useMemo(() => {
    return friends.map((friend) => {

      const fullName = `${friend.firstName} ${friend.lastName}`;

      return {
        ...friend,
        fullName: fullName.trim().length > 0 ? fullName : friend.userName,
        photo: getFileUrl(friend.photo, friend.id),
      };
    });
  }, [friends, getFileUrl]);

  const followFriend = useCallback(async ({ id }: { id: number }) => {
    //
    const result = await proceedFollowFriend({ userId: id });

    notification.apiNotify<string>(result);
    return result;
  }, []);

  const data: FriendsHookDto = {
    isLoading,
    friends: formattedFriends,
    setIsLoading,
    fetchFriends,
    followFriend,
  };

  return { ...data };
};

export default useFriends;

export type FriendsHookDto = {
  isLoading: boolean;
  friends: ResultFriendsDto[] | [];
  setIsLoading: Dispatch<SetStateAction<boolean>>;
  fetchFriends: ({
    type,
  }: {
    type: FriendsTypes;
  }) => Promise<ResultFriendsDto[] | undefined>;
  followFriend: ({
    id,
  }: {
    id: number;
  }) => Promise<ApiResponseDto<ResultFriendsDto[]>>;
};

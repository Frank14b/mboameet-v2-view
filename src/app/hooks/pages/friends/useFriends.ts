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
import { ApiResponseDto, FriendTypesDto, ResultPaginate } from "@/app/types";
import { friendTypes } from "@/app/lib/constants/app";

const useFriends = () => {
  //
  const [friendTypesList] = useState(Object.values(friendTypes));
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [friends, setFriends] = useState<ResultFriendsDto[] | []>([]);
  const [defaultTab] = useState(friendTypesList[0].key as FriendsTypes);
  const [activeTab, setActiveTab] = useState<FriendsTypes>(
    friendTypesList[0].key as FriendsTypes
  );
  const { mainDivComponentRef, getFileUrl } = useMainContext();
  const [isAutoFetchFromScrolling, setIsAutoFetchFromScrolling] =
    useState<boolean>(false);
  const [showLoadingMore, setShowLoadingMore] = useState<boolean>(false);
  const [pagination, setPagination] = useState<ResultPaginate<
    ResultFriendsDto[]
  > | null>(null);

  const fetchFriends = useCallback(
    async ({ type, page = 1 }: { type: FriendsTypes; page?: number }) => {
      //
      setActiveTab(type);
      //
      const result = await getFriends({
        revalidate: true,
        type,
        paginate: {
          page,
          limit: 30,
        },
      });

      setPagination(result?.data ?? null);

      setIsLoading(false);
      setShowLoadingMore(false);
      if (result.status && result?.data?.data) {
        if (page == 1) {
          setFriends(result.data.data);
        } else {
          setFriends((prevData) => {
            return [...prevData, ...(result.data?.data as ResultFriendsDto[])];
          });
        }
        return result.data.data;
      }
      setFriends([]);
    },
    [setIsLoading, setFriends, setPagination, setActiveTab, setShowLoadingMore]
  );

  useEffect(() => {
    fetchFriends({ type: friendTypesList[0].key as FriendsTypes });
  }, [friendTypesList, fetchFriends]);

  const formattedFriends = useMemo(() => {
    return friends.map((friend) => {
      const fullName = `${friend.firstName} ${friend.lastName}`;

      return {
        ...friend,
        fullName: fullName.trim().length > 0 ? fullName : friend.userName,
        photo: getFileUrl(friend.photo, friend.id, friend.userName),
      };
    });
  }, [friends, getFileUrl]);

  const followFriend = useCallback(async ({ id }: { id: number }) => {
    //
    const result = await proceedFollowFriend({ userId: id });

    notification.apiNotify<string>(result);
    return result;
  }, []);

  useEffect(() => {
    const mainDiv = mainDivComponentRef.current;
    if (!mainDiv) return;
    //
    mainDiv.addEventListener("scroll", () => {
      const scrollTop = mainDiv.scrollTop;
      const scrollHeight = mainDiv.scrollHeight;
      const clientHeight = mainDiv.clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        setShowLoadingMore(true);
        setIsAutoFetchFromScrolling(true);
      }
    });
  }, [mainDivComponentRef, setShowLoadingMore, setIsAutoFetchFromScrolling]);

  useEffect(() => {
    if (isAutoFetchFromScrolling && pagination) {
      if (pagination?.currentPage < pagination?.lastPage) {
        fetchFriends({ type: activeTab, page: pagination.currentPage + 1 });
      }else{
        setShowLoadingMore(false);
      }
      setIsAutoFetchFromScrolling(false);
    }
  }, [
    activeTab,
    pagination,
    isAutoFetchFromScrolling,
    fetchFriends,
    setShowLoadingMore,
    setIsAutoFetchFromScrolling,
  ]);

  const data: FriendsHookDto = {
    isLoading,
    showLoadingMore,
    friends: formattedFriends,
    friendTypesList,
    defaultTab,
    activeTab,
    setIsLoading,
    fetchFriends,
    followFriend,
  };

  return { ...data };
};

export default useFriends;

export type FriendsHookDto = {
  isLoading: boolean;
  showLoadingMore: boolean;
  friends: ResultFriendsDto[] | [];
  friendTypesList: FriendTypesDto[];
  defaultTab: FriendsTypes;
  activeTab: FriendsTypes;
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

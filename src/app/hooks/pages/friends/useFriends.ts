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
  const { getFileUrl } = useMainContext();
  const [isAutoFetchFromScrolling, setIsAutoFetchFromScrolling] =
    useState<boolean>(false);
  const [showLoadingMore, setShowLoadingMore] = useState<boolean>(false);
  const [pagination, setPagination] = useState<ResultPaginate<
    ResultFriendsDto[]
  > | null>(null);
  const [currentMainDiv, setCurrentMainDiv] = useState<HTMLDivElement | null>(null);

  const [startIndex, setStartIndex] = useState(0);
  const [itemsPerPage] = useState(30);

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
          setStartIndex((c) => {
            return c + 27;
          });
        }
        return result.data.data;
      }
      setFriends([]);
    },
    [
      setIsLoading,
      setFriends,
      setPagination,
      setActiveTab,
      setShowLoadingMore,
      setStartIndex,
    ]
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

  const handleScrollEvent = useCallback((mainDiv: HTMLDivElement) => {

    setCurrentMainDiv(mainDiv);

    const scrollTop = mainDiv.scrollTop;
    const scrollHeight = mainDiv.scrollHeight;
    const clientHeight = mainDiv.clientHeight;

    if (scrollTop <= 10) {
      if (startIndex - itemsPerPage > 0) {
        setStartIndex(startIndex - 20);
      } else {
        setStartIndex(0);
      }
    } else {
      if (scrollTop + clientHeight >= scrollHeight) {
        setShowLoadingMore(true);
        setIsAutoFetchFromScrolling(true);
      } else {
        if (pagination && pagination.currentPage > pagination.lastPage) {
          if (startIndex + 27 > (pagination?.total ?? 0)) return;

          setShowLoadingMore(true);
          setIsAutoFetchFromScrolling(true);

          setStartIndex((c) => {
            return c + 27;
          });
        }
      }
    }
  }, [
    startIndex,
    itemsPerPage,
    pagination,
    setShowLoadingMore,
    setIsAutoFetchFromScrolling,
    setStartIndex,
    setCurrentMainDiv
  ]);

  useEffect(() => {
    if (isAutoFetchFromScrolling && pagination) {
      if (pagination?.currentPage < pagination?.lastPage) {
        fetchFriends({ type: activeTab, page: pagination.currentPage + 1 });
      } else {
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

  const displayedData = useMemo(() => {
    if (formattedFriends.length <= itemsPerPage) return formattedFriends;

    if (currentMainDiv && startIndex > 0) {
      setTimeout(() => {
        currentMainDiv.scrollTop = (currentMainDiv.scrollHeight - currentMainDiv.clientHeight) * 0.5; // increase the scroll position to remove side effect
      }, 200);
    }

    return formattedFriends.slice(startIndex, startIndex + itemsPerPage);
  }, [formattedFriends, startIndex, itemsPerPage]);

  const data: FriendsHookDto = {
    isLoading,
    showLoadingMore,
    friends: displayedData,
    friendTypesList,
    defaultTab,
    activeTab,
    setIsLoading,
    fetchFriends,
    followFriend,
    handleScrollEvent
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
    page,
  }: {
    type: FriendsTypes;
    page?: number;
  }) => Promise<ResultFriendsDto[] | undefined>;
  followFriend: ({
    id,
  }: {
    id: number;
  }) => Promise<ApiResponseDto<ResultFriendsDto[]>>;
  handleScrollEvent: (e: HTMLDivElement) => void;
};

import { FriendsHookDto } from "@/app/hooks/pages/friends/useFriends";
import {
  TabCustomAnimationProps,
  TabsCustomAnimation,
} from "../../widgets/tabsCustomAnimation";
import { useCallback, useMemo, useState } from "react";
import { FriendsTypes, ResultFriendsDto } from "@/app/types/friends";
import { UserProfileCardSkeleton } from "../../widgets/skeletons/userProfileCardSkeleton";
import { UserProfilePopup } from "../../widgets/userProfilePopup";
import { FriendsItemComponent } from "./friendsItemComponent";
import { NoDataFound } from "../../widgets/noDataFound";

export function FriendsComponent({
  friendsHook,
}: {
  friendsHook: FriendsHookDto;
}) {
  //
  const skeletons: number = 2;
  const { isLoading, friendTypesList, friends, setIsLoading, fetchFriends } =
    friendsHook;
  const defaultTab: FriendsTypes = friendTypesList[0].key as FriendsTypes;
  const [showUserDetails, setShowUserDetails] = useState<{
    status: boolean;
    friend?: ResultFriendsDto;
  }>({ status: false });

  const onTabChange = (tab: string) => {
    setIsLoading(true);
    fetchFriends({
      type: tab as FriendsTypes,
    });
  };

  const onClickUserDetails = useCallback(
    (friend: ResultFriendsDto) => {
      setShowUserDetails({
        status: true,
        friend: friend,
      });
    },
    [setShowUserDetails]
  );

  const friendsList = useMemo(() => {
    if (isLoading)
      return <UserProfileCardSkeleton isLoading={true} count={skeletons} />;
    //
    if (friends.length == 0)
      return (
        <NoDataFound
          customClass="dark:shadow-none h-screen dark:bg-gray-800"
          message=""
        />
      );

    return (
      <div className="grid grid-cols-2 gap-3">
        {friends?.map((friend: ResultFriendsDto, index: number) => (
          <FriendsItemComponent
            index={index}
            key={index}
            friend={friend}
            friendsHook={friendsHook}
            onClickUserDetails={onClickUserDetails}
          />
        ))}
      </div>
    );
  }, [friends, isLoading, friendsHook, onClickUserDetails]);

  const tabMenus = useMemo(() => {
    let result: TabCustomAnimationProps[] = [];

    friendTypesList.map((tab) => {
      result.push({
        label: tab.name.toUpperCase(),
        value: tab.key,
        icon: tab.icon,
        htmlContent: friendsList,
      });
    });

    return result;
  }, [friendsList, friendTypesList]);

  return (
    <div className="w-full">
      {/* // */}
      {showUserDetails.friend && (
        <UserProfilePopup
          show={showUserDetails.status}
          onClose={() =>
            setShowUserDetails((prevData) => {
              return {
                ...prevData,
                status: false,
              };
            })
          }
          user={showUserDetails.friend as ResultFriendsDto}
        />
      )}

      <TabsCustomAnimation
        defaultTab={defaultTab}
        onTabChange={onTabChange}
        tabData={tabMenus}
      />
    </div>
  );
}

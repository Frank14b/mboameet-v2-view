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
import { Spinner } from "@material-tailwind/react";

export function FriendsComponent({
  friendsHook,
}: {
  friendsHook: FriendsHookDto;
}) {
  //
  const skeletons: number = 9;
  const {
    isLoading,
    showLoadingMore,
    defaultTab,
    friendTypesList,
    friends,
    setIsLoading,
    fetchFriends,
  } = friendsHook;

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
          showMessage={false}
        />
      );

    return (
      <>
        <div className="grid md:grid-cols-3 xs:grid-cols-1 sm:grid-cols-2 gap-3">
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

        <>
          <div className="w-full grid justify-center items-center h-10 pt-2">
            {showLoadingMore && <Spinner className="h-12 w-12" />}
          </div>
        </>
      </>
    );
  }, [friends, isLoading, showLoadingMore, friendsHook, onClickUserDetails]);

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

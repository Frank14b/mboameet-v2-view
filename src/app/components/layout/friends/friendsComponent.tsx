import { FriendsHookDto } from "@/app/hooks/pages/friends/useFriends";
import { TabsCustomAnimation } from "../../widgets/tabsCustomAnimation";
import {
  Cog6ToothIcon,
  Square3Stack3DIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useCallback, useMemo, useState } from "react";
import { FriendsTypes, ResultFriendsDto } from "@/app/types/friends";
import { UserProfileCardSkeleton } from "../../widgets/skeletons/userProfileCardSkeleton";
import { UserProfilePopup } from "../../widgets/userProfilePopup";
import { FriendsItemComponent } from "./friendsItemComponent";

export function FriendsComponent({
  friendsHook,
}: {
  friendsHook: FriendsHookDto;
}) {
  //
  const skeletons: number = 2;
  const defaultTab: FriendsTypes = "recommended";
  const { isLoading, setIsLoading, friends, fetchFriends } = friendsHook;
  const [activeTab, setActiveTab] = useState<FriendsTypes>(defaultTab);
  const [showUserDetails, setShowUserDetails] = useState<{
    status: boolean;
    friend?: ResultFriendsDto;
  }>({ status: false });

  const onTabChange = (tab: string) => {
    setIsLoading(true);
    fetchFriends({
      type: tab as FriendsTypes,
    });
    setActiveTab(tab as FriendsTypes);
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

  const recommendedFriends = useMemo(() => {
    if (activeTab != "recommended") return;
    if (isLoading)
      return <UserProfileCardSkeleton isLoading={true} count={skeletons} />;
    //
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
  }, [friends, activeTab, isLoading, friendsHook, onClickUserDetails]);

  const matchFriends = useMemo(() => {
    if (activeTab != "matches") return;
    if (isLoading)
      return <UserProfileCardSkeleton isLoading={true} count={skeletons} />;
    //
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
  }, [friends, activeTab, isLoading, friendsHook, onClickUserDetails]);

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
        tabData={[
          {
            label: "RECOMMENDED",
            value: "recommended",
            icon: Square3Stack3DIcon,
            htmlContent: recommendedFriends,
          },
          {
            label: "MATCHES",
            value: "matches",
            icon: UserCircleIcon,
            htmlContent: matchFriends,
          }
        ]}
      />
    </div>
  );
}

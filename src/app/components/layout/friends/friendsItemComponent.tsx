import { FriendsHookDto } from "@/app/hooks/pages/friends/useFriends";
import { ResultFriendsDto } from "@/app/types/friends";
import { useCallback, useState } from "react";
import { motion } from "framer-motion";
import UserProfileCard from "../../widgets/userProfileCard";

export function FriendsItemComponent({
  index,
  friend,
  friendsHook,
  onClickUserDetails,
}: {
  index: number;
  friend: ResultFriendsDto;
  friendsHook: FriendsHookDto;
  onClickUserDetails: (friend: ResultFriendsDto) => void;
}) {
  const { followFriend } = friendsHook;
  const [isFollowing, setIsFollowing] = useState<boolean>(
    friend.match.length == 1 ? true : false
  );

  const onClickFollow = useCallback(async () => {
    if(isFollowing) return;
    setIsFollowing(!isFollowing);

    const result = await followFriend({
      id: friend.id,
    });
    if (!result.status) {
      setIsFollowing(isFollowing);
    }
  }, [friend, isFollowing, setIsFollowing, followFriend]);

  const onClickBtn = useCallback(async () => {
    onClickUserDetails(friend);
  }, [friend, onClickUserDetails]);

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 1 }}
        transition={{ duration: 0.2 + index / 3 }}
        whileHover={{ scale: 1.02 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        key={index}
      >
        <UserProfileCard
          image={friend.photo ?? ""}
          following={isFollowing}
          name={friend.fullName ?? friend.userName}
          onClickFollow={onClickFollow}
          onClickBtn={onClickBtn}
        />
      </motion.div>
    </>
  );
}

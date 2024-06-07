import { formatDate } from "@/app/lib/utils";
import { ResultFeed } from "@/app/types";
import { Avatar, Typography } from "@material-tailwind/react";
import FeedItemActionMenuComponent from "./FeedMenuActions";
import { Dispatch, SetStateAction } from "react";
import { referenceKeyword } from "@/app/lib/constants/app";
import ProfileTooltipDetailsComponent from "../../profile/ProfileTooltipDetails";
import PopoverCustom from "@/app/components/widgets/PopoverCustom";

export default function FeedHeaderComponent({
  feedData,
  userPhoto,
  setDeleting,
  setUpdateFeedItem,
  handleOpenFeedForm,
  deleteItemAsync,
  canEditFeed,
}: {
  feedData: ResultFeed;
  userPhoto: string;
  setDeleting: any;
  deleteItemAsync: ({
    itemId,
    itemRef,
  }: {
    itemId: number;
    itemRef: string;
  }) => Promise<void>;
  setUpdateFeedItem: Dispatch<SetStateAction<ResultFeed | null>>;
  handleOpenFeedForm: Dispatch<SetStateAction<boolean>>;
  canEditFeed: (feed: ResultFeed) => boolean;
}) {
  //
  const onActionEdit = () => {
    setUpdateFeedItem(feedData);
    handleOpenFeedForm(true);
  };

  const referenceId: string = `${referenceKeyword}-${feedData.id}`;

  const deleteItem = () => {
    setDeleting(true);
    deleteItemAsync({ itemId: feedData.id, itemRef: referenceId });
    // remove the loader is the delete process failed
    setTimeout(() => {
      return setDeleting(false);
    }, 10000);
  };

  return (
    <>
      <div className="grid justify-items-between w-full p-3">
        <div className="flex gap-3 w-full">
          <PopoverCustom
            content={
              <ProfileTooltipDetailsComponent
                user={{
                  ...feedData.user,
                  photo: userPhoto,
                }}
              />
            }
            placement="right-end"
          >
            <Avatar
              placeholder={""}
              variant="circular"
              alt="candice"
              src={userPhoto}
              className="cursor-pointer"
            />
          </PopoverCustom>

          <div>
            <Typography
              placeholder={""}
              variant="h6"
              color="blue-gray"
              className="dark:text-pink-200 cursor-pointer text-sm mt-1"
            >
              <>
                <p className="capitalize">{feedData.user.userName}</p>
                <p className="text-gray-700 font-normal">
                  <small>{formatDate(feedData.createdAt, "ago")}</small>
                </p>
              </>
            </Typography>
          </div>

          <FeedItemActionMenuComponent
            feedData={feedData}
            onActionEdit={onActionEdit}
            deleteItem={deleteItem}
            onShare={() => {}}
            canEditFeed={canEditFeed}
          />
        </div>
      </div>
    </>
  );
}

import { formatDate, referenceKeyword } from "@/app/lib/utils";
import { ResultFeed } from "@/app/types";
import { Avatar, Typography } from "@material-tailwind/react";
import FeedItemActionMenuComponent from "./feedMenuActions";
import { useFeedContext } from "@/app/contexts/pages/feeds";

export default function FeedHeaderComponent({
  feedData,
  userPhoto,
  setDeleting: setDeleting
}: {
  feedData: ResultFeed;
  userPhoto: string;
  setDeleting: any
}) {
  //
  const feedContext = useFeedContext();

  const onActionEdit = () => {
    feedContext.setUpdateFeedItem(feedData);
    feedContext.handleOpenFeedForm(true);
  };

  const referenceId: string = `${referenceKeyword}-${feedData.id}`;

  const deleteItem = () => {
    setDeleting(true);
    feedContext.deleteItemAsync({ itemId: feedData.id, itemRef: referenceId });
    // remove the loader is the delete process failed
    setTimeout(() => {
      return setDeleting(false);
    }, 10000);
  };

  return (
    <>
      <div className="grid justify-items-between w-full p-3">
        <div className="flex gap-3 w-full">
          <Avatar
            placeholder={""}
            variant="circular"
            alt="candice"
            src={userPhoto}
            className="cursor-pointer"
          />
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
          />
        </div>
      </div>
    </>
  );
}

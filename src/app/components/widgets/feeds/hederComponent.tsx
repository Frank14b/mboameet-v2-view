import { formatDate, referenceKeyword } from "@/app/lib/utils";
import { ResultFeed } from "@/app/types";
import { Avatar, Typography } from "@material-tailwind/react";
import FeedItemActionMenuComponent from "./feedMenuActions";
import { HomeContextDto, useHomeContext } from "@/app/template";

export default function FeedHeaderComponent({
  feedData,
  userPhoto,
  setDeleteting
}: {
  feedData: ResultFeed;
  userPhoto: string;
  setDeleteting: any
}) {
  //
  const homeContext: HomeContextDto = useHomeContext();

  const onActionEdit = () => {
    homeContext.setUpdateFeedItem(feedData);
    homeContext.handleOpenFeedForm(true);
  };

  const referenceId: string = `${referenceKeyword}-${feedData.id}`;

  const deleteItem = () => {
    setDeleteting(true);
    homeContext.deleteItemAsync({ itemId: feedData.id, itemRef: referenceId });

    setTimeout(() => {
      return setDeleteting(false);
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

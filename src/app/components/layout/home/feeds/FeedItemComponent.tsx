"use client";

import { useMainContext } from "@/app/contexts/main";
import { formatHashTags } from "@/app/lib/utils";
import { FeedFilesData, FeedItem } from "@/app/types";
import { Card, Carousel } from "@material-tailwind/react";
import { useCallback, useMemo, useState } from "react";
import FeedCommentComponent from "./comments/FeedCommentComponent";
import FeedVideoReaderComponent from "./files/VideoReaderComponent";
import FeedHeaderComponent from "./FeedHeaderComponent";
import FeedImageViewComponent from "./files/FeedImageComponent";
import { FeedHookDto } from "@/app/hooks/pages/feeds/useFeed";
import { FeedFormHookDto } from "@/app/hooks/pages/feeds/useFeedForm";
import { referenceKeyword } from "@/app/lib/constants/app";
import CustomNextImage from "@/app/components/widgets/CustomNextImage";

export default function FeedItemComponent({
  feed,
  fileType,
  feedHook,
  feedFormHook,
  isExpanded,
  handleExpand,
}: FeedItem<FeedHookDto, FeedFormHookDto>) {
  //
  const referenceId: string = `${referenceKeyword}-${feed.id}`;
  const mainContext = useMainContext();
  const { updatedFeed, deleteItemAsync, likeFeed, desLikeFeed, canEditFeed } =
    feedHook;
  const { setUpdateFeedItem, handleOpenFeedForm } = feedFormHook;
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [isUserLiked, setIsUserLiked] = useState<boolean>(
    feed?.feedLikes && feed?.feedLikes?.length == 1 ? true : false
  );
  const [clampText, setClampText] = useState<boolean>(true);

  const feedData = useMemo(() => {
    if (!updatedFeed) return feed;

    if (updatedFeed.id != feed.id) return feed;

    return {
      ...feed,
      message: updatedFeed.message,
      likes: updatedFeed.likes,
      views: updatedFeed.views,
      comments: updatedFeed.comments,
    };
  }, [feed, updatedFeed]);

  const handleReaction = useCallback(() => {
    if (isUserLiked) {
      setIsUserLiked(false);
      desLikeFeed({ id: feedData.id });
    } else {
      setIsUserLiked(true);
      likeFeed({ id: feedData.id });
    }
  }, [isUserLiked, feedData.id, desLikeFeed, likeFeed]);

  return (
    <div id={referenceId}>
      <Card
        placeholder={""}
        className={`${
          isExpanded
            ? "backdrop-blur-sm bg-white bg-opacity-70 dark:backdrop-blur-sm dark:bg-white dark:bg-opacity-70"
            : ""
        } ${"pb-3 pl-0 pr-0 w-full border border-gray-200 dark:border-gray-900 dark:bg-black/5"}`}
      >
        <FeedHeaderComponent
          feedData={feedData}
          userPhoto={mainContext.getFileUrl(
            feedData.user.photo,
            feedData.user.id,
            feedData.user.userName
          )}
          setDeleting={setIsDeleting}
          setUpdateFeedItem={setUpdateFeedItem}
          handleOpenFeedForm={handleOpenFeedForm}
          deleteItemAsync={deleteItemAsync}
          canEditFeed={canEditFeed}
        />

        {feedData.feedFiles != null && feedData.feedFiles.length > 0 && (
          <>
            {fileType == "carousel" && (
              <div className="p-0 mt-0 h-80">
                <Carousel
                  placeholder={""}
                  loop={true}
                  autoplay={false}
                  className=""
                >
                  {feedData.feedFiles.map(
                    (image: FeedFilesData, index: number) => (
                      <CustomNextImage
                        fill={true}
                        key={index}
                        src={mainContext.getFileUrl(
                          image.url,
                          feedData.user.id,
                          feedData.user.userName
                        )}
                        alt="image 1"
                        className="h-full w-full object-cover object-center"
                      />
                    )
                  )}
                </Carousel>
              </div>
            )}

            <FeedImageViewComponent fileType={fileType} feed={feedData} />

            {fileType == "video" && (
              <>
                <FeedVideoReaderComponent
                  feed={feedData}
                  isExpanded={isExpanded}
                  handleExpand={handleExpand}
                />
              </>
            )}
          </>
        )}

        <div
          className={`rounded-xl px-3 pb-3 mb-3 text-sm text-black dark:text-gray-300 ${
            clampText ? "lg:line-clamp-6 xs:line-clamp-5 cursor-pointer" : ""
          }`}
          dangerouslySetInnerHTML={{ __html: formatHashTags(feedData.message) }}
          onClick={() => setClampText(false)}
        ></div>

        <FeedCommentComponent
          feedData={feedData}
          userLiked={isUserLiked}
          handleReaction={handleReaction}
        />

        {isDeleting && (
          <div className="absolute bg-white bg-opacity-60 dark:bg-gray-700 dark:bg-opacity-60 top-0 bottom-0 left-0 w-full z-index-999 rounded-lg"></div>
        )}
      </Card>
    </div>
  );
}

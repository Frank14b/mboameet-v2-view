"use client";

import { useMainContext } from "@/app/contexts/main";
import { formatHashTags, referenceKeyword } from "@/app/lib/utils";
import useFeedStore from "@/app/store/feedStore";
import { useFeedContext } from "@/app/contexts/pages/feeds";
import {
  FeedFilesData,
  FeedItem,
  ResultFeed,
} from "@/app/types";
import { Card, Carousel } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import FeedCommentComponent from "./comments/feedComments";
import FeedVideoReaderComponent from "./files/videoReaderComponent";
import FeedHeaderComponent from "./headerComponent";
import FeedImageViewComponent from "./files/imageViewComponent";

export default function FeedItemsComponent({ feed, fileType }: FeedItem) {
  //
  const mainContext = useMainContext();
  const feedContext = useFeedContext();
  const feedStore = useFeedStore();

  const [feedData, setFeedData] = useState<ResultFeed>(feed);

  const [userLiked, setUserLiked] = useState<boolean>(
    feed?.feedLikes && feed?.feedLikes?.length == 1 ? true : false
  );

  const [deleting, setDeleting] = useState<boolean>(false);
  const referenceId: string = `${referenceKeyword}-${feed.id}`;

  const likeItem = () => {
    setUserLiked(true);
    feedContext.likeFeed({ itemId: feedData.id });
  };

  const desLikeItem = () => {
    setUserLiked(false);
    feedContext.desLikeFeed({ itemId: feedData.id });
  };

  /** update feed data (likes, comments, content, on socket event...) */
  useEffect(() => {
    if (feedStore.updatedFeed?.id == feed.id) {
      setFeedData({
        ...feedData,
        message: feedStore.updatedFeed.message,
        likes: feedStore.updatedFeed.likes,
        views: feedStore.updatedFeed.views,
        comments: feedStore.updatedFeed.comments,
      });
    }
  }, [feedStore.updatedFeed, feed.id]);

  return (
    <div id={referenceId}>
      <Card
        placeholder={""}
        className="pb-3 pl-0 pr-0 w-full border border-gray-200 dark:border-gray-800 dark:bg-gray-900"
      >
        <FeedHeaderComponent
          feedData={feedData}
          userPhoto={
            feedData.user.photo != null
              ? mainContext.getFileUrl(feedData.user.photo, feedData.user.id)
              : "https://docs.material-tailwind.com/img/face-1.jpg"
          }
          setDeleting={setDeleting}
        />

        <div
          className="rounded-xl px-3 py-3 text-sm text-black dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: formatHashTags(feedData.message) }}
        ></div>

        {feedData.feedFiles != null && feedData.feedFiles.length > 0 && (
          <>
            {fileType == "carousel" && (
              <div className="p-0 my-3 h-80">
                <Carousel
                  placeholder={""}
                  loop={true}
                  autoplay={false}
                  className=""
                >
                  {feedData.feedFiles.map(
                    (image: FeedFilesData, index: number) => (
                      <img
                        key={index}
                        src={mainContext.getFileUrl(
                          image.url,
                          feedData.user.id
                        )}
                        alt="image 1"
                        className="h-full w-full object-cover object-center"
                      />
                    )
                  )}
                </Carousel>
              </div>
            )}

            <FeedImageViewComponent
              fileType={fileType}
              feed={feedData}
            />

            {fileType == "video" && (
              <>
                <FeedVideoReaderComponent
                  feed={feedData}
                />
              </>
            )}
          </>
        )}

        <FeedCommentComponent
          feedData={feedData}
          userLiked={userLiked}
          likeItem={likeItem}
          desLikeItem={desLikeItem}
        />

        {deleting && (
          <div className="absolute bg-white bg-opacity-60 dark:bg-gray-700 dark:bg-opacity-60 top-0 bottom-0 left-0 w-full z-index-999 rounded-lg"></div>
        )}
      </Card>
    </div>
  );
}

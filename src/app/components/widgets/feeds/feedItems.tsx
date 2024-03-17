"use client";

import { useMainContext } from "@/app/contexts/main";
import { formatDate, formatHashTags, referenceKeyword } from "@/app/lib/utils";
import useFeedStore from "@/app/store/feedStore";
import { useHomeContext } from "@/app/template";
import {
  FeedCommentData,
  FeedFilesData,
  FeedItem,
  ResultFeed,
} from "@/app/types";
import { Avatar, Card, Carousel, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import FeedItemActionMenuComponent from "./feedMenuActions";
import FeedCommentComponent from "./feedComments";

export default function FeedItemsComponent({ data, fileType }: FeedItem) {
  //
  const mainContext = useMainContext();
  const homeContext = useHomeContext();
  const feedStore = useFeedStore();

  const [feedData, setFeedData] = useState<ResultFeed>(data);
  const [feedComments, setFeedComments] = useState<FeedCommentData[] | null>(
    null
  );

  const [userLiked, setUserLiked] = useState<boolean>(
    data?.feedLikes && data?.feedLikes?.length == 1 ? true : false
  );

  const onActionEdit = () => {
    homeContext.setUpdateFeedItem(feedData);
    homeContext.handleOpenFeedForm(true);
  };

  const [deleteting, setDeleteting] = useState<boolean>(false);
  const referenceId: string = `${referenceKeyword}-${data.id}`;

  const deleteItem = () => {
    setDeleteting(true);
    homeContext.deleteItem({ itemId: data.id, itemRef: referenceId });

    setTimeout(() => {
      return setDeleteting(false);
    }, 10000);
  };

  const likeItem = () => {
    setUserLiked(true);
    homeContext.likeFeed({ itemId: data.id });
  };

  const desLikeItem = () => {
    setUserLiked(false);
    homeContext.desLikeFeed({ itemId: data.id });
  };

  const fetchComments = async () => {
    const result = await homeContext.fetchComments({ itemId: data.id });
    setFeedComments(result);
  };

  useEffect(() => {
    if (feedStore.updatedFeed?.id == data.id) {
      setFeedData({
        ...feedData,
        message: feedStore.updatedFeed.message,
        likes: feedStore.updatedFeed.likes,
        views: feedStore.updatedFeed.views,
      });
    }
  }, [feedStore.updatedFeed]);

  return (
    <div id={referenceId}>
      <Card
        placeholder={""}
        className="pb-3 pl-0 pr-0 w-full border border-gray-200 dark:border-gray-800 dark:bg-gray-900"
      >
        <div className="grid justify-items-between w-full p-3">
          <div className="flex gap-3 w-full">
            <Avatar
              placeholder={""}
              variant="circular"
              alt="candice"
              src={
                feedData.user.photo != null
                  ? mainContext.getFileUrl(
                      feedData.user.photo,
                      feedData.user.id
                    )
                  : "https://docs.material-tailwind.com/img/face-1.jpg"
              }
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

        <div
          className="rounded-xl px-3 py-3 text-sm text-black dark:text-gray-300"
          dangerouslySetInnerHTML={{ __html: formatHashTags(feedData.message) }}
        ></div>

        {feedData.feedFiles != null && feedData.feedFiles.length > 0 && (
          <>
            {fileType == "caroussel" && (
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

            {fileType == "image" && (
              <>
                <div className="grid my-3 min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
                  <div className="grid grid-cols-1">
                    <div>
                      <img
                        className="object-cover object-center h-90 max-w-full md:h-90"
                        src={mainContext.getFileUrl(
                          feedData.feedFiles[0].url,
                          feedData.user.id
                        )}
                        alt="-"
                      />
                    </div>
                  </div>
                </div>
              </>
            )}

            {fileType == "images" && (
              <>
                <div className="grid my-3 min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
                  <div className="grid grid-cols-2">
                    {feedData.feedFiles.map(
                      (image: FeedFilesData, index: number) => (
                        <div key={index}>
                          <img
                            className="object-cover object-center h-90 max-w-full md:h-90 bg-white"
                            src={mainContext.getFileUrl(
                              image.url,
                              feedData.user.id
                            )}
                            alt="-"
                          />
                        </div>
                      )
                    )}
                  </div>
                </div>
              </>
            )}

            {fileType == "video" && (
              <>
                <div className="p-3 my-3 h-100">
                  <video
                    className="h-full w-full rounded-lg objectfit-cover"
                    controls
                    autoPlay
                  >
                    <source
                      src="https://docs.material-tailwind.com/demo.mp4"
                      type="video/mp4"
                    />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </>
            )}
          </>
        )}

        <FeedCommentComponent
          feedData={feedData}
          userLiked={userLiked}
          likeItem={likeItem}
          desLikeItem={desLikeItem}
          comments={feedComments}
          fetchComments={fetchComments}
        />

        {deleteting && (
          <div className="absolute bg-white bg-opacity-60 dark:bg-gray-700 dark:bg-opacity-60 top-0 bottom-0 left-0 w-full z-index-999 rounded-lg"></div>
        )}
      </Card>
    </div>
  );
}

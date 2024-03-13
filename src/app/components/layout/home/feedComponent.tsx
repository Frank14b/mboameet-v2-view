import {
  ApiResponseDto,
  FeedFilesData,
  ResultFeed,
  ResultPaginate,
} from "@/app/types";
import FeedItemsComponent from "../../widgets/feedItems";
import FeedSkeletonComponent from "../../skeletons/feedSkeleton";
import { MutableRefObject, useEffect, useState } from "react";
import { getFeeds, proceedDeleteFeed } from "@/app/services/server-actions/feeds";
import { useAppHubContext } from "@/app/contexts/appHub";

export default function FeedComponent() {
  const [loading, setLoading] = useState<boolean>(true);
  const [feeds, setFeeds] = useState<ResultFeed[]>([]);

  const hubContent = useAppHubContext();

  const fetchFeeds = async () => {
    const result: ApiResponseDto<ResultPaginate<ResultFeed[]>> = await getFeeds(
      {
        revalidate: true,
      }
    );
    if (result.status && result?.data?.data) {
      setFeeds(result.data.data);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchFeeds();
  }, [hubContent.feedHubs?.newFeed]);

  useEffect(() => {
    if(hubContent.feedHubs?.deletedFeed) {
      let currentFeeds = feeds;
      const deletedFeedIndex = currentFeeds.findIndex((f: ResultFeed) => f.id == hubContent.feedHubs.deletedFeed)
      if(deletedFeedIndex == -1) return;
      currentFeeds = currentFeeds.splice(deletedFeedIndex, 1);
      setFeeds(currentFeeds);
    }
  }, [hubContent.feedHubs?.deletedFeed])

  const getFileType = (files: FeedFilesData[]) => {
    if (files.length > 2) return "caroussel";
    if (files.length == 1) return "image";
    return "images";
  };

  const deleteItem = async ({ itemId, itemRef }: { itemId: number, itemRef: string}) => {
    const result = await proceedDeleteFeed(itemId);
    if(result.status) {
      document.getElementById(itemRef)?.remove();
    }
  };

  return (
    <>
      <FeedSkeletonComponent isLoading={loading} count={5} />

      {!loading &&
        (feeds.length > 0 ? (
          <>
            {feeds.map((feed: ResultFeed, index: number) => (
              <div
                className="w-full mt-3 bg-white dark:bg-black/15 rounded-xl"
                key={index}
              >
                <FeedItemsComponent
                  data={feed}
                  fileType={getFileType(feed.feedFiles)}
                  onActionDelete={deleteItem}
                />
              </div>
            ))}
          </>
        ) : (
          <></>
        ))}
    </>
  );
}

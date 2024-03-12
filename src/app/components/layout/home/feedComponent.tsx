import {
  ApiResponseDto,
  FeedFilesData,
  ResultFeed,
  ResultPaginate,
} from "@/app/types";
import FeedItemsComponent from "../../widgets/feedItems";
import FeedSkeletonComponent from "../../skeletons/feedSkeleton";
import { useEffect, useState } from "react";
import { getFeeds } from "@/app/services/server-actions/feeds";
import { useHomeContext } from "@/app/template";

export default function FeedComponent() {
  const homeContext = useHomeContext();
  const [loading, setLoading] = useState<boolean>(true);
  const [feeds, setFeeds] = useState<ResultFeed[]>([]);

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
  }, []);

  const getFileType = (files: FeedFilesData[]) => {
    if (files.length > 2) return "caroussel";
    if (files.length == 1) return "image";
    return "images";
  };

  const deleteItem = async ({ itemId }: { itemId: number }) => {
    await fetchFeeds();
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

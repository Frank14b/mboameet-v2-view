import { FeedFilesData, ResultFeed } from "@/app/types";
import FeedItemsComponent from "../../widgets/feedItems";
import FeedSkeletonComponent from "../../skeletons/feedSkeleton";

export default function FeedComponent({
  isLoading,
  feeds,
}: {
  isLoading: boolean;
  feeds: ResultFeed[];
}) {

  const getFileType = (files: FeedFilesData[]) => {
    if(files.length > 2) return "caroussel"
    if(files.length == 1) return "image"
    return "images"
  }

  return (
    <>
      <FeedSkeletonComponent isLoading={isLoading} count={5} />

      {!isLoading &&
        (feeds.length > 0 ? (
          feeds.map((feed: ResultFeed, index: number) => (
            <div className="w-full mt-3 bg-white dark:bg-black/15 rounded-xl" key={index}>
              <FeedItemsComponent
                data={feed}
                fileType={getFileType(feed.feedFiles)}
              />
            </div>
          ))
        ) : (
          <></>
        ))}
    </>
  );
}

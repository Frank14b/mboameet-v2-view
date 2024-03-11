import { ResultFeed } from "@/app/types";
import FeedItemsComponent from "../../widgets/feedItems";
import FeedSkeletonComponent from "../../skeletons/feedSkeleton";

export default function FeedComponent({
  isLoading,
  feeds,
}: {
  isLoading: boolean;
  feeds: ResultFeed[];
}) {
  return (
    <>
      <FeedSkeletonComponent isLoading={isLoading} count={5} />

      {!isLoading &&
        (feeds.length > 0 ? (
          feeds.map((feed: ResultFeed, index: number) => (
            <div className="w-full mt-3 bg-white dark:bg-black/15 rounded-xl" key={index}>
              <FeedItemsComponent
                data={feed}
                fileType="caroussel"
              />
            </div>
          ))
          // <>
          //   <div className="w-full px-3 mt-6 bg-white dark:bg-black/15 rounded-xl p-3">
          //     <FeedItemsComponent
          //       title=""
          //       icon={""}
          //       subTitle=""
          //       fileType="caroussel"
          //     />
          //   </div>
          //   <div className="w-full px-3 mt-3 bg-white dark:bg-black/15 rounded-xl p-3">
          //     <FeedItemsComponent title="" icon={""} subTitle="" />
          //   </div>
          //   <div className="w-full px-3 mt-3 bg-white dark:bg-black/15 rounded-xl p-3">
          //     <FeedItemsComponent
          //       title=""
          //       icon={""}
          //       subTitle=""
          //       fileType="images"
          //     />
          //   </div>
          //   <div className="w-full px-3 mt-3 bg-white dark:bg-black/15 rounded-xl p-3">
          //     <FeedItemsComponent
          //       title=""
          //       icon={""}
          //       subTitle=""
          //       fileType="video"
          //     />
          //   </div>
          // </>
        ) : (
          <></>
        ))}
    </>
  );
}

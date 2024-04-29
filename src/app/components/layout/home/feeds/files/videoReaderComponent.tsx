import { useMainContext } from "@/app/contexts/main";
import { feedVideoReaderId } from "@/app/lib/constants/app";
import { ResultFeed } from "@/app/types";

export default function FeedVideoReaderComponent({
  feed,
}: {
  feed: ResultFeed;
}) {
  const mainContext = useMainContext();
  //

  const src: string = mainContext.getFileUrl(
    feed.feedFiles?.[0].url ?? "",
    feed.user.id
  );

  if (!feed.feedFiles) return <>No video file was found</>;
   
  return (
    <>
      <div
        className={`p-3 my-3 h-100 ${feedVideoReaderId}`}
        id={`${feedVideoReaderId}-${feed.id}`}
      >
        <video
          className="h-full w-full rounded-lg object-cover"
          controls={false}
          autoPlay={false}
          style={{ height: "350px" }}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </>
  );
}

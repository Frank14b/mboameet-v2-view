import { useMainContext } from "@/app/contexts/main";
import { feedVideoReaderId, getContentEditable } from "@/app/lib/utils";
import { ResultFeed } from "@/app/types";
import { useEffect } from "react";

export default function FeedVideoReaderComponent({
  feed,
}: {
  feed: ResultFeed;
}) {
  if (!feed.feedFiles) return <>No video file was found</>;

  const mainContext = useMainContext();

  const src: string = mainContext.getFileUrl(
    feed.feedFiles[0].url,
    feed.user.id
  );
  //

  useEffect(() => {
    const currentElement = getContentEditable(`${feedVideoReaderId}-${feed.id}`);
    // currentElement.scrollTop

    // console.log("🚀 ~ useEffect ~ currentElement.scrollTop:", currentElement?.offsetTop)
  }, [mainContext.mainScroll])
   

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

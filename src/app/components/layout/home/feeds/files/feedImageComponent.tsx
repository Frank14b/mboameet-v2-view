import { useMainContext } from "@/app/contexts/main";
import { FeedFilesData, ResultFeed } from "@/app/types";
import Image from "next/image";

export default function FeedImageViewComponent({
  fileType,
  feed,
}: {
  fileType?: string;
  feed: ResultFeed;
}) {
  const mainContext = useMainContext();

  return (
    <>
      {fileType == "image" && feed.feedFiles && (
        <>
          <div className="grid my-3 min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
            <div className="grid grid-cols-1">
              <div>
                <Image
                  width={2000}
                  height={800}
                  className="object-cover object-center h-90 max-w-full md:h-90 max-h-[25rem]"
                  src={mainContext.getFileUrl(
                    feed.feedFiles[0].url,
                    feed.user.id
                  )}
                  alt="-"
                  priority={true}
                />
              </div>
            </div>
          </div>
        </>
      )}

      {fileType == "images" && feed.feedFiles && (
        <>
          <div className="grid my-3 min-h-[140px] w-full place-items-center overflow-x-scroll lg:overflow-visible bg-white dark:bg-gray-900">
            <div className="grid grid-cols-2">
              {feed?.feedFiles.map((image: FeedFilesData, index: number) => (
                <div key={index}>
                  <Image
                    width={1200}
                    height={600}
                    className="object-cover object-center h-90 max-w-full md:h-90 bg-white"
                    src={mainContext.getFileUrl(image.url, feed.user.id)}
                    alt="-"
                    priority={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}

import { useMainContext } from "@/app/contexts/main";
import useLocalStorage from "@/app/hooks/useLocalStorage";
import { feedVideoReaderId, mainDivComponentId } from "@/app/lib/constants/app";
import { offsetElementPosition } from "@/app/lib/utils";
import { ResultFeed } from "@/app/types";
import {
  ArrowUpOnSquareStackIcon,
  ArrowsPointingOutIcon,
  MusicalNoteIcon,
  PauseIcon,
  PlayIcon,
} from "@heroicons/react/24/solid";
import { IconButton } from "@material-tailwind/react";
import { useCallback, useEffect, useRef, useState } from "react";

export type VideoPlayerOptions = {
  currentTime: number;
  duration: number;
  volume: number;
  muted: boolean;
  paused: boolean;
  ended: boolean;
};

export default function FeedVideoReaderComponent({
  feed,
}: {
  feed: ResultFeed;
}) {
  const mainContext = useMainContext();
  const { set, get } = useLocalStorage();
  const videoPlayerTagElement = useRef(null);
  const feedMainDivElement = useRef(null);
  //
  const [videoPlayerData, setVideoPlayerData] = useState<VideoPlayerOptions>({
    currentTime: 0,
    duration: 0,
    volume: 1,
    muted: true,
    paused: true,
    ended: false,
  });

  const getVideoPlayerElement = useCallback(() => {
    if (videoPlayerTagElement.current) {
      return videoPlayerTagElement.current as HTMLVideoElement;
    }
    return null;
  }, []);

  useEffect(() => {
    const videPlayer = getVideoPlayerElement();
    if (!videPlayer) return;

    const savedSettings = get(`${feedVideoReaderId}-video-player-${feed.id}`);

    if (savedSettings && typeof savedSettings == "string") {
      const settings = JSON.parse(savedSettings) as VideoPlayerOptions;

      videPlayer.currentTime = settings.currentTime;
      videPlayer.volume = settings.volume;
    }
    videPlayer.muted = true;
  }, [feed, get, setVideoPlayerData, getVideoPlayerElement]);

  useEffect(() => {
    set(
      `${feedVideoReaderId}-video-player-${feed.id}`,
      JSON.stringify(videoPlayerData)
    );
  }, [feed, videoPlayerData, set]);

  const src: string = mainContext.getFileUrl(
    feed.feedFiles?.[0].url ?? "",
    feed.user.id
  );

  const handlePlayerMouseEnter = useCallback(() => {
    const videPlayer = getVideoPlayerElement();
    if (!videPlayer) return;
    videPlayer.controls = false;
  }, [getVideoPlayerElement]);

  const handlePlayerEvents = useCallback(() => {
    const videPlayer = getVideoPlayerElement();

    if (videPlayer && feedMainDivElement.current) {
      const feedVideoDiv = feedMainDivElement.current as HTMLDivElement;

      videPlayer.disablePictureInPicture = true;
      videPlayer.disableRemotePlayback = true;
      videPlayer.playsInline = true;
      videPlayer.controls = false;
      let videoPaused = true;

      const divOffset = offsetElementPosition(feedVideoDiv);
      if (divOffset.top >= 80 && divOffset.top <= 400) {
        videPlayer.play();
        videoPaused = false;
      } else {
        videPlayer.pause();
      }

      setVideoPlayerData((prevData) => {
        return {
          ...prevData,
          currentTime: videPlayer.currentTime,
          duration: videPlayer.duration,
          paused: videoPaused,
          muted: videPlayer.muted,
          ended: videPlayer.ended,
        };
      });
    }
  }, [setVideoPlayerData, getVideoPlayerElement]);

  useEffect(() => {
    const mainDiv = document.getElementById(
      `${mainDivComponentId}`
    ) as HTMLDivElement;
    //
    mainDiv.addEventListener("scroll", () => {
      handlePlayerEvents();
    });

    const videoPlayer = getVideoPlayerElement();
    if (videoPlayer) {
      videoPlayer.addEventListener("contextmenu", (e) => {
        e.preventDefault();
      });
    }
  }, [handlePlayerEvents, getVideoPlayerElement]);

  const handlePlayPause = useCallback(() => {
    const videPlayer = getVideoPlayerElement();
    if (!videPlayer) return;

    let videoPaused = true;
    if (videPlayer.paused) {
      videPlayer.play();
      videoPaused = false;
    } else {
      videPlayer.pause();
    }

    setVideoPlayerData((prevData) => {
      return {
        ...prevData,
        paused: videoPaused,
      };
    });
  }, [setVideoPlayerData, getVideoPlayerElement]);

  const handleSound = useCallback(() => {
    const videPlayer = getVideoPlayerElement();
    if (!videPlayer) return;

    videPlayer.muted = !videPlayer.muted;
    setVideoPlayerData((prevData) => {
      return {
        ...prevData,
        muted: videPlayer.muted,
      };
    });
  }, [setVideoPlayerData, getVideoPlayerElement]);

  const handleExpand = useCallback(() => {

  }, [])

  if (!feed.feedFiles) return <>No video file was found</>;

  return (
    <>
      <div className={`p-3 my-3 h-100 relative`} ref={feedMainDivElement}>
        <video
          ref={videoPlayerTagElement}
          className={`h-full w-full rounded-lg object-cover cursor-pointer`}
          style={{ height: "350px" }}
          preload="auto"
          controls={false}
          onMouseEnter={handlePlayerMouseEnter}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="video-controls absolute bottom-5 left-5 right-5 bg-transparent rounded-lg px-3">
          <div className="flex justify-between">
            {videoPlayerData.paused ? (
              <>
                <IconButton
                  style={{ width: "25px", height: "25px" }}
                  size="sm"
                  placeholder={""}
                  className="cursor-pointer rounded-full"
                  onClick={handlePlayPause}
                >
                  <PlayIcon className="h-3 w-3" />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton
                  style={{ width: "25px", height: "25px" }}
                  size="sm"
                  placeholder={""}
                  className="cursor-pointer rounded-full"
                  onClick={handlePlayPause}
                >
                  <PauseIcon className="h-3 w-3" />
                </IconButton>

                <div className="space-x-2">
                  <IconButton
                    size="sm"
                    style={{ width: "25px", height: "25px" }}
                    placeholder={""}
                    className={`cursor-pointer rounded-full right ${
                      videoPlayerData.muted ? "bg-red-700" : ""
                    }`}
                    onClick={handleSound}
                  >
                    <MusicalNoteIcon className="h-3 w-3" />
                  </IconButton>
                  {/* // */}
                  <IconButton
                    size="sm"
                    style={{ width: "25px", height: "25px" }}
                    placeholder={""}
                    className={`cursor-pointer rounded-full right`}
                    onClick={handleExpand}
                  >
                    <ArrowsPointingOutIcon className="h-3 w-3" />
                  </IconButton>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

import { useCallback, useEffect, useState } from "react";
import { notification } from "../lib/notifications";

const useCamera = () => {
  //
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [video, setVideo] = useState<HTMLVideoElement | null>(null);
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (navigator.mediaDevices === undefined) {
      notification.notifyError("Media is not supported by your browser.");
    }
  }, [notification.notifyError]);

  const closeMedia = useCallback(() => {
    if (!stream) return;
    stream?.getTracks().forEach((track) => track.stop());
  }, [stream]);

  useEffect(() => {
    return () => {
      closeMedia();
    };
  }, [closeMedia]);

  const initMedia = useCallback(
    async ({
      audio = true,
      videoRef,
      canvasRef,
    }: {
      audio?: boolean;
      videoRef: HTMLVideoElement;
      canvasRef?: HTMLCanvasElement;
    }) => {
      try {
        const media = await navigator.mediaDevices?.getUserMedia({
          video: true,
          audio: audio,
        });

        videoRef.srcObject = media;
        videoRef.play();

        setVideo(video);
        setStream(media);
        canvasRef && setCanvas(canvasRef);
      } catch (error) {
        console.log("camera ~ error:", error);
      }
    },
    [setStream, setVideo]
  );

  const takePhoto = useCallback(() => {
    if (!video || !canvas) {
      console.log("missing video or canvas element");
      return;
    }

    try {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      const context = canvas.getContext("2d");
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataURL = canvas.toDataURL("image/png");
      return dataURL;
    } catch (error) {
      return null;
    }
  }, [video]);

  const data = {
    stream,
    takePhoto,
    initMedia,
    closeMedia
  };

  return { ...data };
};

export default useCamera;

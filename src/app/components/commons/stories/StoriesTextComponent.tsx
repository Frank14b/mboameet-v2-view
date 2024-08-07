import { useMainContext } from "@/app/contexts/main";
import useStories from "@/app/hooks/useStories";
import { StoriesTypes } from "@/app/types";
import { Button, Spinner } from "@material-tailwind/react";
import AnimateFadeOut from "../../widgets/motions/AnimateFadeOut";
import { useCallback } from "react";

export type StoriesTextComponentProps = {
  handleClose: () => void;
};

export default function StoriesTextComponent({
  handleClose,
}: StoriesTextComponentProps) {
  //
  const { storiesTextEditableRef, isLoading, handleSubmitStories } =
    useStories();
  const { isDark } = useMainContext();

  const submitStory = useCallback(async () => {
    const result = await handleSubmitStories({ type: StoriesTypes.TEXT });
    if (result) {
      handleClose();
    }
  }, [handleClose]);

  return (
    <AnimateFadeOut>
      <div
        ref={storiesTextEditableRef}
        className={`${
          isDark
            ? "text-gray-200 border-gray-600/30"
            : "text-gray-800 border-gray-333/30"
        } textarea p-3 min-h-10 rounded-xl border text-center`}
        role="textbox"
        contentEditable={true}
        suppressContentEditableWarning={true}
      ></div>

      <Button
        placeholder={""}
        variant="gradient"
        color="pink"
        onClick={submitStory}
        className="mt-5 w-[200px] mx-auto justify-center flex"
        disabled={isLoading}
        fullWidth
      >
        {!isLoading && <span>Submit</span>}
        {isLoading && <Spinner className="size-5" />}
      </Button>
    </AnimateFadeOut>
  );
}

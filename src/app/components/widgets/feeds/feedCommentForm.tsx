"use client";

import {
  feedCommentFormEditable,
  focusOnLastText,
  formatHashTags,
  getContentEditable,
} from "@/app/lib/utils";
import { FeedCommentFormProps } from "@/app/types";
import { IconButton } from "@material-tailwind/react";
import { useEffect } from "react";

export default function FeedCommentFormComponent({
  feedId,
  updateItem,
  onComment,
  onEditComment,
}: FeedCommentFormProps) {
  //
  const formRef: string = `${feedCommentFormEditable}${
    updateItem ? `-${updateItem.id}` : ""
  }-${feedId}`;

  const handleKeyPress = (e: KeyboardEvent) => {
    const content = getContentEditable(formRef);
    if (e.key == " ") {
      content.innerHTML = formatHashTags(content.innerText);
      focusOnLastText(content);
    }
  };

  useEffect(() => {
    const content = getContentEditable(`${formRef}`);
    if (updateItem) {
      content.innerHTML = formatHashTags(updateItem.content); //set updated feed message
    } else {
      // format hahstags on first load if text available
      if (!content) return;
      content.innerHTML = formatHashTags(content.innerText);
    }

    handleKeyPress && content?.addEventListener("keyup", handleKeyPress);
  }, [updateItem]);

  // process to feed comment
  const handleFeedComment = async () => {
    if (!onComment) return;

    await onComment({ feedId: feedId, formRef: formRef });
  };

  // process to feed edit comment
  const handleUpdateFeedComment = async () => {
    if (!onEditComment || !updateItem) return;

    await onEditComment({
      feedId: feedId,
      id: updateItem.id,
      formRef: formRef,
    });
  };

  return (
    <>
      {/* ---- */}
      <div className="relative">
        <div
          id={`${formRef}`}
          className="textarea text-gray-800 dark:text-gray-100 p-3 min-h-10 text-sm rounded-xl border border-gray-900/30 dark:border-gray-400/30"
          role="textbox"
          contentEditable={true}
          suppressContentEditableWarning={true}
          // onClick={() => handleGetCursorPosition()}
        >
          {" "}
          <>{}</>{" "}
        </div>
        <span className="absolute right-0 bottom-0">
          <IconButton
            onClick={() =>
              updateItem ? handleUpdateFeedComment() : handleFeedComment()
            }
            placeholder={""}
            variant="text"
            className="rounded-xl dark:text-gray-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>
          </IconButton>
        </span>
      </div>
    </>
  );
}

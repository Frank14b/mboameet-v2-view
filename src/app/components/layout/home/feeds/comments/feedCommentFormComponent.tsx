"use client";

import {
  feedCommentFormEditable,
  focusOnLastText,
  formatHashTags,
  getContentEditable,
} from "@/app/lib/utils";
import { FeedCommentFormProps } from "@/app/types";
import { IconButton } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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

  const [formDivWidth, setFormDivWidth] = useState<string>(
    updateItem ? `100%` : `60px`
  );

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
      // format hashtags on first load if text available
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

    const data = await onEditComment({
      feedId: feedId,
      id: updateItem.id,
      formRef: formRef,
    });
  };

  return (
    <>
      {/* ---- */}
      <motion.div
        initial={{ width: formDivWidth, scale: 1, float: "right" }}
        transition={{ duration: 0.3 }}
        whileHover={{ width: "100%" }}
        onHoverStart={() => setFormDivWidth(`100%`)}
      >
        <div className="relative">
          <div
            style={{ minHeight: "38px" }}
            id={`${formRef}`}
            className="textarea text-gray-700 dark:text-gray-100 pl-3 pb-2 pt-2 pr-10 mb-3 text-sm rounded-xl border border-gray-900/30 dark:border-gray-400/30"
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
              size="sm"
              placeholder={""}
              variant="text"
              className="rounded-xl dark:text-gray-300 mr-1"
              style={{ marginTop: "-16px" }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 23 23"
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
      </motion.div>
    </>
  );
}

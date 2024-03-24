import { ChangeEvent } from "react";
import { DateTime } from "luxon";

export const passwordRegex: string =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
export const passwordErrorMessage: string =
  "Password must contains upper, lowercase, number, special char and min 8 digits";
export const invalidEmailErrorMessage: string =
  "Invalid email e.g: example@test.com";
export const requiredEmailErrorMessage: string = "Email address is required";
export const defaultProfileImg =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

export const mainDivComponentId: string = `main-app-div`
export const referenceKeyword: string = `feed-card-item-`;
export const referenceCommentKeyword: string = `feed-item-ref-comment-`;
export const feedFormEditable: string = `feedFormEditable`;
export const feedCommentFormEditable: string = `feedCommentFormEditable`;
export const feedInputFile: string = `custom-feed-input-file`;
export const feedInputVideoFile: string = `custom-feed-input-video-file`;
export const feedVideoPreviewId: string = `feed-video-preview`;
export const feedVideoReaderId: string = `feed-video-reader`;

export const replaceLineBreaks = (text: string) => {
  return text.replace(/\n/g, "<br>");
};

export const formatHashTags = (text: string): string => {
  const regex = /#[a-zA-Z0-9_]+/g;
  // Find all matches and wrap them in a div
  const wrappedString = text.replace(
    regex,
    (s) => "<span class='hashtag'>" + s + "</span>"
  );
  const finalText = replaceLineBreaks(formatATags(wrappedString));
  return finalText;
};

export const formatATags = (text: string): string => {
  const regex = /@[a-zA-Z0-9_]+/g;
  // Find all matches and wrap them in a div
  const wrappedString = text.replace(
    regex,
    (s) => "<span class='arobasetag'>" + s + "</span>"
  );
  return wrappedString;
};

export const focusOnLastText = (contentEditableElement: HTMLElement | null) => {
  // Check if the element is contentEditable
  if (!contentEditableElement?.contentEditable) {
    return; // Do nothing if not contentEditable
  }

  const selection = window.getSelection();
  const range = document.createRange();

  if (!selection) return;

  // Get the last child node (assuming it's a text node)
  const lastChild = contentEditableElement.lastChild;

  // Handle different scenarios:
  if (lastChild && lastChild.nodeType === Node.TEXT_NODE) {
    // If there's a text node as the last child, set focus at its end
    range.selectNodeContents(lastChild);
    range.collapse(false); // Collapse to the end of the text node
  } else if (contentEditableElement.childNodes.length > 0) {
    // If there's no text node as the last child, but there are elements,
    // set focus at the end of the last element's content
    range.setStart(
      contentEditableElement.childNodes[
        contentEditableElement.childNodes.length - 1
      ],
      Object.keys(
        contentEditableElement.childNodes[
          contentEditableElement.childNodes.length - 1
        ]
      ).length
    );
    range.collapse(true); // Collapse to the end
  } else {
    // If the contentEditable is empty, set focus at the beginning
    range.setStart(contentEditableElement, 0);
    range.collapse(true);
  }

  selection.removeAllRanges();
  selection.addRange(range);
  contentEditableElement.focus();
};

export const focusPosition = (contentEditableElement: HTMLElement | null) => {
  if (!contentEditableElement) return null;
  // Get the selection object
  const selection = window.getSelection();

  if (!selection) return null;
  // Check if there's a selection (cursor might be blinking without selection)
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    // Get the cursor position relative to the start of the contenteditable div
    const cursorPos = range.startOffset;
    console.log("Cursor position:", cursorPos);
    // You can use cursorPos to perform actions based on cursor location
  }
};

export const createFileUploadString = (e: ChangeEvent<HTMLInputElement>) => {
  if (!e?.target?.files?.[0]) return ""; // if no file found return immediately
  return URL.createObjectURL(e.target.files[0]);
};

export const fileExtFromBase64 = (base64: string) => {
  return base64.substring(base64.indexOf("/") + 1, base64.indexOf(";base64"));
};

export const createVideoPreview = (file: File, previewId: string) => {
  //
  const videoPreview = document.getElementById(
    `${previewId}`
  ) as HTMLVideoElement;
  videoPreview.innerHTML = "";

  const reader = new FileReader();

  reader.onload = function (e: any) {
    const videoSource = document.createElement("source");
    videoSource.setAttribute("src", e.target.result);
    videoPreview.appendChild(videoSource);
    videoPreview.load();
    videoPreview.play();
  };

  reader.readAsDataURL(file);

  return file;
};

export const validateFileUploadType = (
  file: File,
  expectedType: "video" | "image"
) => {
  if (!file) return null; // if no file found return immediately

  console.log("🚀 ~ file.type:", file.type);

  if (file.type.includes(expectedType)) {
    return {
      status: true,
      file: file,
    };
  }

  return { status: false };
};

export const range = (start: number, end: number) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
};

export const getContentEditable = (id: string) => {
  const contentEditableDiv = document.getElementById(`${id}`) as HTMLDivElement;

  return contentEditableDiv;
};

export const clickFileUpload = (id: string) => {
  const contentInputFile = document.getElementById(`${id}`) as HTMLInputElement;
  contentInputFile?.click();
};

type DateFormatType = "ago" | "datetime" | "time" | "date";

const validateDateAgo = (date: Date) => {
  const units: any = [
    "year",
    "month",
    "week",
    "day",
    "hour",
    "minute",
    "second",
  ];

  let dateTime = DateTime.fromISO(`${date}`);
  const diff = dateTime.diffNow().shiftTo(...units);
  const unit = units.find((unit: any) => diff.get(unit) !== 0) || "second";

  const relativeFormatter = new Intl.RelativeTimeFormat("en", {
    numeric: "auto",
  });
  return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
};

export const formatDate = (date: Date, format: DateFormatType): string => {
  switch (format) {
    case "ago":
      return validateDateAgo(date); //=> '20 hours and 55 minutes'
    default:
      return "";
  }
};

export const handleScrollEvent = ({
  elementId,
  callback,
}: {
  elementId?: string;
  callback: (event: any) => void;
}) => {

  let element: Document | HTMLElement = document;

  if(elementId) {
    element = getContentEditable(elementId);
  }

  element.addEventListener('scroll', (event: any) => {
    return callback(event)
  })
};

export const getWidgetScreenPosition = (content: HTMLElement) => {};

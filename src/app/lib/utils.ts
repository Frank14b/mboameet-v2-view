import { ChangeEvent, MutableRefObject } from "react";
import { DateTime } from "luxon";
import secureLocalStorage from "react-secure-storage";
import { ObjectKeyDto } from "../types";

let debounceTimer: any = null;

export const validPhoneNumber = (number: string): boolean => {
  const regex: RegExp = /^[0-9-]+$/;
  return regex.test(number);
};

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
    // console.log("Cursor position:", cursorPos);
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

export const getContentEditableWithRef = (ref: MutableRefObject<null>) => {
  if (!ref.current) return;

  const contentEditableDiv = ref.current as HTMLDivElement;
  return contentEditableDiv;
};

export const removeItem = (itemRef: React.RefObject<any>) => {
  if (itemRef.current) {
    itemRef.current.parentNode.removeChild(itemRef.current);
  }
};

export const clickFileUpload = (id: string) => {
  const contentInputFile = document.getElementById(`${id}`) as HTMLInputElement;
  contentInputFile?.click();
};

export const clickFileUploadWithRef = (ref: MutableRefObject<null>) => {
  if (!ref.current) return;

  const contentInputFile = ref.current as HTMLInputElement;
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

// local storage utils
export const setLocalStorage = (
  key: string,
  value: string,
  secure: boolean
) => {
  if (!secure) localStorage.setItem(key, value);

  secureLocalStorage.setItem(key, value);
};

export const getLocalStorage = (key: string, secure: boolean) => {
  if (!secure) return localStorage.getItem(key);

  return secureLocalStorage.getItem(key);
};

export const removeLocalStorage = (key: string, secure: boolean) => {
  if (!secure) localStorage.removeItem(key);

  secureLocalStorage.removeItem(key);
};

export const scrollToBottom = (id: string) => {
  const element = document.getElementById(id);
  if (!element) return;
  element.scrollTop = element.scrollHeight;
};

export const debounce = (func: Function, delay: number, ...args: any[]) => {
  if (debounceTimer) {
    clearTimeout(debounceTimer);
  }

  debounceTimer = setTimeout(() => {
    func(...args);
    clearTimeout(debounceTimer);
  }, delay);
};

export const checkFileExtensionUsingLink = (link: string) => {
  const extension = link.split(".").pop();
  if (extension === "mp4") {
    return "video";
  } else if (
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "png"
  ) {
    return "image";
  } else {
    return null;
  }
};

export const offsetElementPosition = (el: HTMLElement) => {
  var rect = el.getBoundingClientRect(),
    scrollLeft = document.documentElement.scrollLeft,
    scrollTop = document.documentElement.scrollTop;
  return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
};

export const dynamicSort = (property: string) => {
  var sortOrder = 1;
  if (property[0] === "-") {
    sortOrder = -1;
    property = property.substr(1);
  }
  return function (a: ObjectKeyDto, b: ObjectKeyDto) {
    /* next line works with strings and numbers,
     * and you may want to customize it to your needs
     */
    var result =
      a[property] < b[property] ? -1 : a[property] > b[property] ? 1 : 0;
    return result * sortOrder;
  };
};

const imageFromInitial: {
  [key: string]: string;
} = {};

export const generateInitialsImage = (userName: string) => {
  if (imageFromInitial?.[userName]) return imageFromInitial[userName];
  //
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) return "";

  // Extract first letter and set to uppercase
  const initials = userName.charAt(0).toUpperCase();

  // Set canvas size (adjust as needed)
  canvas.width = 300;
  canvas.height = 300;

  // Fill background
  ctx.fillStyle = "#f0f0f0";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  // Set text styles
  ctx.font = "90px Arial";
  ctx.fillStyle = `${generateRandomHexColor()}`;
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";

  // Draw initials text
  ctx.fillText(initials, canvas.width / 2, canvas.height / 2);

  // Get base64 data URL
  const dataURL = canvas.toDataURL("image/png");

  imageFromInitial[userName] = dataURL;
  return dataURL;
};

export const  generateRandomHexColor = () => {
  // Generate a random integer between 0 and 16777215 (inclusive)
  const randomNum = Math.floor(Math.random() * 16777215);

  // Convert the number to a hexadecimal string and pad it with zeros
  const hexColor = "#" + randomNum.toString(16).padStart(6, '0');

  return hexColor;
}

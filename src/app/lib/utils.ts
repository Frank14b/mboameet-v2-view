import { ChangeEvent } from "react";

export const passwordRegex: string =
  "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$";
export const passwordErrorMessage: string =
  "Password must contains upper, lowercase, number, special char and min 8 digits";
export const invalidEmailErrorMessage: string =
  "Invalid email e.g: example@test.com";
export const requiredEmailErrorMessage: string = "Email address is required";
export const defaultProfileImg =
  "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80";

export const referenceKeyword: string = `feed-card-item-`;

// export const generateBrowserId = async (): Promise<string | null> => {
//     if (!window) return null; // Check for window object (client-side)

//     // Use modern properties for navigator information:
//     const navigatorInfo = navigator.userAgent;

//     // Avoid plugins for compatibility and privacy:
//     const screenResolution = `${screen.width}x${screen.height}`;
//     const timeZone = new Date().getTimezoneOffset();

//     // Compose browserId without plugins:
//     const browserId = `${navigatorInfo}${screenResolution}${timeZone}`;

//     // Hash the browserId using a more secure algorithm:
//     const hashedBrowserId = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(browserId))
//     //   .then(hashedBuffer => btoa(String.fromCharCode(...new Uint8Array(hashedBuffer))));
//   };

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
  return base64.substring(base64.indexOf('/') + 1, base64.indexOf(';base64'));
}

export const range = (start: number, end: number) => {
  var ans = [];
  for (let i = start; i <= end; i++) {
      ans.push(i);
  }
  return ans;
}

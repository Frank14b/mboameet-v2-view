import { range } from "@/app/lib/utils";
import {
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Typography,
} from "@material-tailwind/react";

export default function ConversationSkeleton({
  isLoading,
  count = 6,
}: {
  isLoading: boolean;
  count: number;
}) {
  if (!isLoading) return <></>;
  return (
    <List placeholder={""} className="w-full animate-pulse h-screen mt-1 pt-5 px-3 overflow-y-auto">
      {range(1, count).map((value: number, index: number) => (
        <ListItem
          placeholder={""}
          className={`dark:bg-gray-900 ${
            value % Math.floor(Math.random() * 4) == 0 ? "bg-gray-100" : ""
          } w-full`}
          key={`${value}-skeleton-${index}`}
        >
          <ListItemPrefix placeholder={""}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-12 w-12 text-gray-500 rounded-full bg-gray-300 p-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
              />
            </svg>
          </ListItemPrefix>
          <div className="w-full pt-2">
            <Typography
              placeholder={""}
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-40 rounded-full bg-gray-300 dark:bg-gray-900"
            >
              &nbsp;
            </Typography>
            <Typography
              placeholder={""}
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-full rounded-full bg-gray-300 dark:bg-gray-900"
            >
              &nbsp;
            </Typography>
            <Typography
              placeholder={""}
              as="div"
              variant="paragraph"
              className="mb-2 h-2 w-96 rounded-full bg-gray-300 dark:bg-gray-900"
            >
              &nbsp;
            </Typography>
          </div>
          <ListItemSuffix placeholder={""}>
            <></>
          </ListItemSuffix>
        </ListItem>
      ))}
    </List>
  );
}
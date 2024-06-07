import {
  List,
  ListItem,
  ListItemPrefix,
  Typography,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import AnimateHoverScale from "./motions/AnimateHoverScale";
import CustomNextImage from "./CustomNextImage";
import { formatDate } from "@/app/lib/utils";

export type ListWithAvatarProps = {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  chip?: number;
  reference: string;
  date?: Date;
};

export default function ListWithAvatar({
  activeItem,
  data,
  onActionClick,
}: {
  activeItem?: number;
  data: ListWithAvatarProps[];
  onActionClick?: (data: ListWithAvatarProps) => void;
}) {
  return (
    <List placeholder={""}>
      {data.map((item, index: number) => {
        return (
          <AnimateHoverScale index={index} key={index}>
            <ListItem
              placeholder={""}
              onClick={() => onActionClick?.(item)}
              className={`dark:bg-gray-900 ${
                activeItem == item.id ? "bg-gray-300" : ""
              }`}
              key={index}
            >
              <ListItemPrefix placeholder={""}>
                <CustomNextImage
                  className="rounded-full"
                  height={45}
                  width={45}
                  alt={item.title}
                  src={item.image}
                />
              </ListItemPrefix>

              {activeItem != item.id && (
                <div className="">
                  <Typography
                    placeholder={""}
                    variant="h6"
                    color="blue-gray"
                    className="dark:text-gray-400 capitalize"
                  >
                    {item.title}
                  </Typography>
                  <div className="line-clamp-1 md:max-w-[35rem] xs:max-w-[10rem]">
                    <Typography
                      placeholder={""}
                      variant="small"
                      color="gray"
                      className="font-normal dark:text-gray-600"
                    >
                      {item.subTitle}
                    </Typography>
                  </div>
                </div>
              )}

              <ListItemSuffix placeholder={""}>
                <div className="flex gap-3">
                  <div className="text-xs">
                    {item.date && formatDate(item.date, "ago")}
                  </div>
                  {item.chip && activeItem != item.id ? (
                    <Chip
                      value={item.chip}
                      variant="ghost"
                      size="sm"
                      className="rounded-full px-2 py-1 text-xs group-hover:bg-white/20 group-hover:text-white dark:bg-gray-500"
                    />
                  ) : (
                    <></>
                  )}
                </div>
              </ListItemSuffix>
            </ListItem>
          </AnimateHoverScale>
        );
      })}
    </List>
  );
}

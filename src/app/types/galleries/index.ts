import { FeedFilesData, ResultPaginate } from "..";
import { ChatFilesData } from "../chats";

export type ResultUserGalleries = {
  chatFiles: ResultPaginate<ChatFilesData[]>;
  feedFiles: ResultPaginate<FeedFilesData[]>;
};

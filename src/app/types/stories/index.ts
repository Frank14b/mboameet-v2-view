export enum StoriesTypes {
  TEXT = "TEXT",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
}

export type ResultStoriesDto = {
  id: number;
  fileUrl: string;
  type: StoriesTypes;
  content?: string;
  user: {
    id: number;
    userName: string;
    photo: string;
  };
};

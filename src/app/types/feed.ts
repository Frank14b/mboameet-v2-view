import { ResultUserDto } from "./user";

export type FeedFormData = {
    message: string
}

export type FeedFilesData = {
    id: number;
    type: string;
    previewUrl: string;
    url: string;
}

export type ResultFeed = {
    id: number;
    message: string
    user: ResultUserDto;
    feedFiles: FeedFilesData[];
    feedComments: string[];
    status: boolean;
    createdAt: Date;
}
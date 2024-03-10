export type FeedFormData = {
    message: string
}

export type ResultFeed = {
    id: number;
    message: string
    user: string;
    feedFiles: string;
    feedComments: string;
    status: boolean;
    createdAt: Date;
}
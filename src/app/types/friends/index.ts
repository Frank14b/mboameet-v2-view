export type ResultFriendsDto = {
  id: number;
  userName: string;
  firstName?: string | undefined;
  lastName?: string | undefined;
  email: string;
  photo?: string;
  fullName?: string;
  match: any[];
  likes: number;
  views: number;
  createdAt: Date;
};

export type FriendsTypes = "recommended" | "matches";
import { TUser } from './user';

export type TArticle = {
  id: string;
  title: string;
  body: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  authorId: string;
  author: TUser;
};

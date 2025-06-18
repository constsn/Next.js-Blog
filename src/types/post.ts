export type Tag = {
  id: number;
  name: string;
};

export type Post = {
  id: number;
  title: string;
  content: string;
  published: boolean;
  coverImageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  tags: Tag[];
};

export type Comment = {
  id: number;
  author: string;
  content: string;
  createdAt: Date;
  parentId?: number | null;
  authorEmail?: string | null;
};

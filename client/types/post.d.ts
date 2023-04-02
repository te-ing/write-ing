export interface PostType {
  id: number;
  createdAt: string;
  updatedAt: string;
  nickname: string;
  title: string;
  subtitle?: string;
  content: string;
  status: string;
  tag?: string;
  like?: [];
  comment?: [];
  view: number;
}

export interface PostEditType {
  title: string;
  subtitle?: string;
  content: string;
  status: string;
  tag?: string;
}

export interface PostEditForm extends PostEditType {
  category?: string;
}

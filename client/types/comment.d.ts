export interface CommentType {
  id: number;
  writeTime: string;
  author: string;
  content: string;
  nickname: string;
  password: string;
}

export interface CommentEditType {
  content: string;
  nickname: string;
  author: string;
  password: string;
}

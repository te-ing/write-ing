export interface CommentType {
  id: number;
  postId: number;
  writeTime: string;
  author: string;
  body: string;
  nickname: string;
  password: string;
}

export interface CommentEditType {
  body: string;
  nickname: string;
  author: string;
  password: string;
}

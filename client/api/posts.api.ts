import { CommentType } from 'types/comment';
import { PostType } from 'types/post';
import { Axios } from './base.api';
import { rsaEncode } from 'utils/encode';

interface PostCreate {
  title: string;
  subtitle?: string;
  nickname: string;
  status: string;
  content: string;
  category?: string;
  tag?: string;
}

export const getPostList = async () => {
  const { data } = await Axios.get(`post/list`);
  return data;
};

export const getPostDetail = async (id: string): Promise<PostType> => {
  const { data } = await Axios.get(`post/${id}`);
  return data;
};

export const createPost = async (payload: PostCreate) => {
  const { data } = await Axios.post(`post/create`, {
    ...payload,
  });
  return data;
};

export const editPost = async (id: string, payload: PostCreate) => {
  const { data } = await Axios.patch(
    `post/${id}`,
    {
      ...payload,
    },
    {
      withCredentials: true,
    }
  );
  return data;
};

export const deletePost = async (id: number) => {
  const { data } = await Axios.delete(`post/${id}`);
  return data;
};

export const getComment = async (postId: number): Promise<CommentType[]> => {
  const { data } = await Axios(`post/${postId}/comment`, {
    withCredentials: true,
  });
  return data;
};

interface createCommentPayload {
  postId: number;
  nickname: string;
  password: string;
  body: string;
}
export const createComment = async ({ body, nickname, password, postId }: createCommentPayload) => {
  const encodedPassword = await rsaEncode(password);
  const { data } = await Axios.post(
    `post/${postId}/comment`,
    {
      nickname,
      encodedPassword,
      body,
    },
    { withCredentials: true }
  );
  return data;
};
interface deleteCommentPayload {
  postId: number;
  commentId: number;
  password: string;
}
export const deleteComment = async ({ commentId, password, postId }: deleteCommentPayload) => {
  const encodedPassword = await rsaEncode(password);
  const { data } = await Axios.delete(`post/${postId}/comment/${commentId}`, {
    data: {
      encodedPassword,
    },
    withCredentials: true,
  });
  return data;
};

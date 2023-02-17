import { CommentType } from 'types/comment';
import { Axios } from './base.api';

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

export const createPost = async (payload: PostCreate) => {
  const { data } = await Axios.post(`post/create`, {
    payload,
  });
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
  body: string;
}
export const createComment = async (payload: createCommentPayload) => {
  const { data } = await Axios.post(
    `post/${payload.postId}/comment`,
    {
      body: payload.body,
    },
    { withCredentials: true }
  );
  return data;
};

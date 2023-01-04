import { instance } from './base.api';

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
  const { data } = await instance.get(`post/list`);
  return data;
};

export const createPost = async (payload: PostCreate) => {
  const { data } = await instance.post(`post/create`, {
    payload,
  });
  return data;
};

export const deletePost = async (id: number) => {
  const { data } = await instance.delete(`post/${id}`);
  return data;
};

import { instance } from './base.api';

export const getPost = async () => {
  const { data } = await instance.get(`post/list`);

  return data;
};

interface PostCreate {
  title: string;
  subtitle?: string;
  nickname: string;
  status: string;
  content: string;
  category?: string;
  tag?: string;
}

export const createPost = async (payload: PostCreate) => {
  const { data } = await instance.post(`post/create`, {
    payload,
  });

  return data;
};

import { instance } from './base.api';

export const getPost = async () => {
  const { data } = await instance.get(`post`);

  return data;
};

export const writePost = async (payload) => {
  const { data } = await instance.post(`post`, {
    payload,
  });

  return data;
};

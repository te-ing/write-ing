import { instance } from './base.api';

export const getPublicKey = async () => {
  const { data } = await instance(`auth/key`);
  return data;
};

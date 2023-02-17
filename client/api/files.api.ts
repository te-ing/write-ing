import { Axios } from './base.api';

export const createImageFile = async (formData: FormData, dir?: string) => {
  const { data } = await Axios.post(`files/upload/image/${dir}`, formData, {
    headers: { 'Context-Type': 'multipart/form-data' },
  });
  return data;
};

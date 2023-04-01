import { isAxiosError } from 'axios';
import { LoginForm, RegisterForm } from 'types/user';
import { Axios } from './base.api';
import { rsaEncode } from 'utils/encode';

export const getPublicKey = async () => {
  const { data } = await Axios(`auth/key`);
  return data;
};

export const userLogin = async ({ email, password }: LoginForm) => {
  try {
    const encodedPassword = await rsaEncode(password);
    const response = await Axios.post(`auth/login`, { email, encodedPassword }, { withCredentials: true });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userRegister = async ({ email, nickname, password }: RegisterForm) => {
  const encodedPassword = await rsaEncode(password);
  const response = await Axios.post(`auth/register`, {
    email,
    nickname,
    encodedPassword,
  });
  return response;
};

import { isAxiosError } from 'axios';
import { LoginForm, RegisterForm } from 'types/user';
import { Axios } from './base.api';

export const getPublicKey = async () => {
  const { data } = await Axios(`auth/key`);
  return data;
};

export const userLogin = async ({ email, password }: LoginForm) => {
  try {
    const response = await Axios.post(`auth/login`, { email, password }, { withCredentials: true });
    return response;
  } catch (error) {
    throw error;
  }
};

export const userRegister = async ({ email, nickname, password }: RegisterForm) => {
  const response = await Axios.post(`auth/register`, {
    email,
    nickname,
    password,
  });
  return response;
};

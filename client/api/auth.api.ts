import { LoginForm, RegisterForm } from 'types/user';
import { instance } from './base.api';

export const getPublicKey = async () => {
  const { data } = await instance(`auth/key`);
  return data;
};

export const userLogin = async ({ email, password }: LoginForm) => {
  const { data } = await instance.post(`auth/login`, { email, password });
  return data;
};

export const userRegister = async ({ email, nickname, password }: RegisterForm) => {
  const { data } = await instance.post(`auth/register`, {
    email,
    nickname,
    password,
  });
  return data;
};

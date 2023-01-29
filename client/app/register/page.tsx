'use client';
import styles from './register.module.scss';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getPublicKey, userRegister } from 'api/auth.api';
import { rsaEncode } from 'utiles/encode';
import { RegisterForm } from 'types/user';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<RegisterForm>();
  const router = useRouter();

  const onSubmit = async ({ email, password, checkPassword, nickname }: RegisterForm) => {
    if (password !== checkPassword) return;
    const encodedPassword = await rsaEncode(password);
    const { data } = await userRegister({ email, nickname, password: encodedPassword });
    console.log(data);
    // router.push(`/home`);
  };
  return (
    <>
      <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <input id="email" {...register('email')} type="text" placeholder="email" />
        <input id="nickname" {...register('nickname')} type="text" placeholder="nickname" />
        <input id="checkPassword" {...register('checkPassword')} type="password" placeholder="password" />
        <input id="password" {...register('password')} type="password" placeholder="password" />
        <button>회원가입</button>
      </form>
    </>
  );
}

'use client';
import styles from './register.module.scss';
import { useForm } from 'react-hook-form';
import { RegisterFormValues } from 'types/formValues';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { getPublicKey } from 'api/auth.api';
import { rsaEncode } from 'utiles/encode';

export default function RegisterPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<RegisterFormValues>();
  const router = useRouter();

  const onSubmit = async ({ email, password, checkPassword, nickname }: RegisterFormValues) => {
    if (password !== checkPassword) return;
    const encodedPassword = await rsaEncode(password);
    const res = await axios.post(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/auth/register`, {
      email,
      nickname,
      password: encodedPassword,
    });
    console.log(res.data);
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

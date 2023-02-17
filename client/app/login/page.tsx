'use client';
import styles from './login.module.scss';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { userLogin } from 'api/auth.api';
import { rsaEncode } from 'utiles/encode';
import { LoginForm } from 'types/user';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<LoginForm>();
  const router = useRouter();

  const onSubmit = async ({ email, password }: LoginForm) => {
    const encodedPassword = await rsaEncode(password);
    const res = await userLogin({ email, password: encodedPassword });
    if (res.status === 200) {
      console.log(res.data);
      // router.push(`/home`);
    }
  };
  return (
    <>
      <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <input id="id" {...register('email')} type="text" placeholder="email" />
        <input id="password" {...register('password')} type="password" placeholder="password" />
        <button type="submit">로그인</button>
        <button type="button" onClick={() => router.push('/register')}>
          회원가입
        </button>
      </form>
    </>
  );
}

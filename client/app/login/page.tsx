'use client';
import styles from './login.module.scss';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { userLogin } from 'api/auth.api';
import { rsaEncode } from 'utils/encode';
import { LoginForm } from 'types/user';
import { useMutation } from 'react-query';
import { isAxiosError } from 'axios';
import cx from 'classnames';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    setError,
  } = useForm<LoginForm>();
  const router = useRouter();

  const loginMutation = useMutation(userLogin);

  const onSubmit = async ({ email, password }: LoginForm) => {
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: () => router.push('/home'),
        onError: (error) => {
          setError('email', { message: 'error.response.data' });
          if (isAxiosError(error) && error.response.data) {
            setError('email', { message: error.response.data });
          } else {
            setError('email', { message: '로그인 중 오류가 발생하였습니다.' });
          }
        },
      }
    );
  };

  return (
    <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
      <input id="email" {...register('email')} type="text" placeholder="email" />
      <input id="password" {...register('password')} type="password" placeholder="password" />
      <small role="alert" className={cx(styles.error, { [styles.errorVisible]: !!errors })}>
        {(errors.password || errors.email) && (errors.email!.message || errors.password!.message)}
      </small>
      <button type="submit">로그인</button>
      <button type="button" onClick={() => router.push('/register')} disabled={isSubmitting}>
        회원가입
      </button>
    </form>
  );
}

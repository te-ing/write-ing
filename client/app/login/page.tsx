'use client';
import styles from './login.module.scss';
import { useForm } from 'react-hook-form';
import { LoginFormValues } from 'types/formValues';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<LoginFormValues>();
  const router = useRouter();

  const onSubmit = async () => {
    router.push(`/home`);
  };
  return (
    <>
      <form className={styles.form_wrapper} onSubmit={handleSubmit(onSubmit)}>
        <input id="id" {...register('id')} type="text" placeholder="ID" />
        <input id="password" {...register('password')} type="text" placeholder="PW" />
        <button>login</button>
      </form>
    </>
  );
}

'use client';
import styles from './edit.module.scss';
import { createPost } from 'api/posts.api';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { EditFormValues } from 'types/formValues';

const ToastEditor = dynamic(() => import('components/ToastEditor'), {
  ssr: false,
});
export default function EditPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<EditFormValues>();
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onSubmit = async ({ title }: EditFormValues) => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    const payload = {
      title,
      nickname: '테스트유저',
      content: contentHtml,
      status: 'active',
    };
    const res = await createPost(payload);
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <input
          id="title"
          {...register('title')}
          type="text"
          className={styles.title_input}
          placeholder="제목을 입력하세요"
        />
      </div>
      {isLoading ? (
        ''
      ) : (
        <div className={styles.editor}>
          <ToastEditor editorRef={editorRef} />
        </div>
      )}
      <button>click</button>
    </form>
  );
}

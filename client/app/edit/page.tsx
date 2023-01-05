'use client';
import React, { Suspense, useEffect, useRef, useState } from 'react';
import styles from './edit.module.scss';
import { createPost } from 'api/posts.api';
import { useForm } from 'react-hook-form';
import dynamic from 'next/dynamic';

interface FormValues {
  title: string;
  subtitle?: string;
  nickname: string;
  status: string;
  content: string;
  category?: string;
  tag?: string;
}

const ToastEditor = dynamic(() => import('components/ToastEditor'), {
  ssr: false,
});

export default function EditPage() {
  const editorRef = useRef(null);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<FormValues>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(false);
  }, []);

  const onSubmit = async ({ title }: FormValues) => {
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
    <>
      <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.title}>
          <input {...register('title')} type="text" className={styles.title_input} placeholder="제목을 입력하세요" />
        </div>
        <Suspense fallback={<p>로딩..</p>}>
          <div className={styles.editor} resource={''}>
            <ToastEditor editorRef={editorRef} />
          </div>
        </Suspense>
        <button>click</button>
      </form>
    </>
  );
}

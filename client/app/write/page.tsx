'use client';
import styles from './write.module.scss';
import { createPost } from 'api/posts.api';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createImageFile } from 'api/files.api';
import { PostEditForm } from 'types/post';
import ToastEditor from 'components/ToastEditor';
import { CommonButton } from 'components/common/inputs/CommonButton/CommonButton';

export default function WritePage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<PostEditForm>();
  const editorRef = useRef(null);
  const router = useRouter();

  const onSubmit = async ({ title }: PostEditForm) => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    const payload = {
      title,
      nickname: '테스트유저',
      content: contentHtml,
      status: 'active',
    };
    const response = await createPost(payload);
    router.push(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/post/${response.id}`);
  };

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files === null) return;
    const baseUrl = process.env.NEXT_PUBLIC_SERVER_BASE_URL;
    const file = event.target.files[0];

    const formData = new FormData();
    formData.append('file', file);
    formData.append('type', 'image');

    try {
      const response = await createImageFile(formData, 'post');
      const imageTag = `\n<img src="${baseUrl}/images/post/${response.filename}" width="" height="" />`;
      editorRef.current.getInstance().insertText(imageTag);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className={styles.wrapper} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.title}>
        <input
          id="title"
          {...register('title')}
          type="text"
          className={styles.titleInput}
          placeholder="제목을 입력하세요"
        />
      </div>
      <input id="image" type="file" onChange={uploadImage} />
      <div className={styles.editor}>
        <ToastEditor editorRef={editorRef} />
      </div>
      <CommonButton text="작성" type="submit" />
    </form>
  );
}

'use client';
import styles from './edit.module.scss';
import { createPost, getPostDetail } from 'api/posts.api';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createImageFile } from 'api/files.api';
import { PostEditForm } from 'types/post';
import ToastEditor from 'components/ToastEditor';
import { CommonButton } from 'components/common/inputs/CommonButton/CommonButton';
import { useQuery } from 'react-query';

export default function EditPage() {
  const { register, handleSubmit, setValue } = useForm<PostEditForm>();
  const editorRef = useRef(null);
  const router = useRouter();
  const postId = usePathname().split('/')[2];
  const { isLoading, isError, data } = useQuery('posts', async () => await getPostDetail(postId), {
    onSuccess: ({ title }) => setValue('title', title),
  });
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

  if (isLoading) return <h3>Loading...</h3>;
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
        <ToastEditor editorRef={editorRef} initialValue={data?.content.replace(/<\/?[^>]+(>|$)/g, '')} />
      </div>
      <CommonButton text="작성" type="submit" />
    </form>
  );
}

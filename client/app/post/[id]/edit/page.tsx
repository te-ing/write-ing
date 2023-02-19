'use client';
import styles from './edit.module.scss';
import { editPost } from 'api/posts.api';
import dynamic from 'next/dynamic';
import { useForm } from 'react-hook-form';
import { useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { createImageFile } from 'api/files.api';
import { PostEditForm } from 'types/post';

const ToastEditor = dynamic(() => import('components/ToastEditor'), {
  ssr: false,
});
export default function EditPage() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<PostEditForm>();
  const editorRef = useRef(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname()
  const postId = pathname.split('/')[2]
  
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const onSubmit = async ({ title }: PostEditForm) => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    const payload = {
      title,
      nickname: '테스트유저',
      content: contentHtml,
      status: 'active',
    };
    const response = await editPost(postId, payload);
    router.push(`${process.env.NEXT_PUBLIC_CLIENT_BASE_URL}/post/${postId}`);
    console.log(response)
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
          className={styles.title_input}
          placeholder="제목을 입력하세요"
        />
      </div>
      <input id="image" type="file" onChange={uploadImage} />
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

'use client';
import styles from './edit.module.scss';
import { getPostDetail } from 'api/posts.api';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Editor } from '@toast-ui/react-editor';
import { useQuery } from 'react-query';

export default function EditPage() {
  const editorRef = useRef(null);
  const postId = usePathname().split('/')[2]
  const { isLoading, isError, data } = useQuery('posts', async () => await getPostDetail(postId))
  const onSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
  };

  if(isLoading) return <h3>loading..</h3>
  return (
    <form className={styles.wrapper} onSubmit={onSubmit}>
      <div className={styles.title}>
        <input
          id="title"
          type="text"
          className={styles.title_input}
          placeholder="제목을 입력하세요"
        />
      </div>
      <Editor
          previewStyle="vertical"
          height="400px"
          initialEditType="markdown"
        initialValue={data.content}
          ref={editorRef}
      />
      <button>click</button>
    </form>
  );
}

'use client';
import React, { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.js';
import styles from './edit.module.scss';
import { createPost } from 'api/posts.api';
import { useForm } from 'react-hook-form';

export default function EditPage() {
  const editorRef = useRef(null);
  const toolbarItems = [
    ['heading', 'bold', 'italic', 'strike'],
    ['hr'],
    ['ul', 'ol', 'task'],
    ['table', 'link'],
    ['image'],
    ['code'],
    ['scrollSync'],
  ];

  interface FormValues {
    title: string;
    subtitle?: string;
    nickname: string;
    status: string;
    content: string;
    category?: string;
    tag?: string;
  }

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
    setError,
  } = useForm<FormValues>();

  useEffect(() => {
    const initTerminal = async () => {
      const { Terminal } = await import('xterm');
      const term = new Terminal();
      // Add logic with `term`
    };
    initTerminal();
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
        <div className={styles.editor}>
          <Editor
            ref={editorRef}
            initialValue="" // 글 수정 시 사용
            initialEditType="markdown" // wysiwyg & markdown
            hideModeSwitch={true}
            height="500px"
            usageStatistics={false}
            toolbarItems={toolbarItems}
            plugins={[colorSyntax, codeSyntaxHighlight]}
          />
        </div>
        <button>click</button>
      </form>
    </>
  );
}

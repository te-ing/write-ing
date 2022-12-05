'use client';
import React, { useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.js';
import dayjs from 'dayjs';
import styles from './edit.module.scss';
import { writePost } from 'api/posts.api';
import { PostEditType } from 'types/post';

export default function Page() {
  const titleRef = useRef(null);
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

  const showContent = async () => {
    const editorIns = editorRef.current.getInstance();
    const contentHtml = editorIns.getHTML();
    const contentMark = editorIns.getMarkdown();
    // console.log(contentMark);
    // console.log(contentHtml);

    const payload: PostEditType = {
      title: titleRef.current.value,
      subtitle: contentMark.slice(0, 30),
      content: contentMark,
      status: 'public',
      tag: '회고' || '스터디' || '기록',
    };
    const response = await writePost(payload);

    console.log(response);
    console.log(payload);
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <input ref={titleRef} type="text" className={styles.title_input} placeholder="제목을 입력하세요" />
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
      <button onClick={showContent}>Write</button>
    </div>
  );
}

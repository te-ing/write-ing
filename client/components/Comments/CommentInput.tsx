'use client';

import { useState } from 'react';
import { CommentEditType } from 'types/comment';
import styles from './CommentInput.module.scss';

const CommentInput = () => {
  const [commentContent, setCommentContent] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const submitComment = (): CommentEditType => {
    const result = {
      content: commentContent,
      nickname: 'string',
      author: 'string',
      password: 'string',
    };
    setCommentContent('');
    console.log(result);
    return result;
  };

  return (
    <div>
      <textarea placeholder="입력하세요" value={commentContent} onChange={onChange}></textarea>
      <button onClick={submitComment}>등록</button>
    </div>
  );
};

export default CommentInput;

'use client';

import { createComment } from 'api/posts.api';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CommentEditType } from 'types/comment';
import styles from './CommentInput.module.scss';

interface CommentInputProps {
  postId: number;
}

const CommentInput = ({ postId }: CommentInputProps) => {
  const [commentContent, setCommentContent] = useState('');

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const submitComment = async () => {
    const result = {
      content: commentContent,
      nickname: 'string',
      author: 'string',
      password: 'string',
    };
    const res = await createComment({ postId, body: commentContent });
    setCommentContent('');
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

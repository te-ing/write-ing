'use client';

import { createComment } from 'api/posts.api';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { CommentEditType } from 'types/comment';
import styles from './CommentInput.module.scss';

interface CommentInputProps {
  postId: number;
}

const CommentInput = ({ postId }: CommentInputProps) => {
  const { register, handleSubmit, reset } = useForm<{ body: string }>();
  const queryClient = useQueryClient();
  const commentCreateMutation = useMutation(createComment, {
    onSuccess: () => {
      queryClient.invalidateQueries('getComment');
      reset();
    },
  });

  const onSubmit = async ({ body }: { body: string }) => {
    try {
      const res = commentCreateMutation.mutate({ postId, body });
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <textarea placeholder="입력하세요" {...register('body')}></textarea>
      <button type="submit">등록</button>
    </form>
  );
};

export default CommentInput;

'use client';

import { createComment } from 'api/posts.api';
import { CommonButton } from 'components/common/inputs/CommonButton/CommonButton';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
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
    <form onSubmit={handleSubmit(onSubmit)} className={styles.commentForm}>
      <div className={styles.submitWrapper}>
        <label htmlFor="nickname">닉네임</label>
        <input type="text" id="nickname" />
        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" />
        <CommonButton type="submit" width="60px" height="30px" text="작성" />
      </div>
      <textarea placeholder="댓글을 작성해주세요!" {...register('body')}></textarea>
    </form>
  );
};

export default CommentInput;

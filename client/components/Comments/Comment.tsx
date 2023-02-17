'use client';

import { deleteComment } from 'api/posts.api';
import { useMutation, useQueryClient } from 'react-query';
import { CommentType } from 'types/comment';
import styles from './Comment.module.scss';

const Comment = ({ comment }: { comment: CommentType }) => {
  const queryClient = useQueryClient();
  const commentDeleteMutation = useMutation(deleteComment, {
    onSuccess: (res) => {
      queryClient.invalidateQueries('getComment');
    },
  });

  const handleDeleteComment = () => {
    commentDeleteMutation.mutate({ postId: comment.postId, commentId: comment.id });
  };

  return (
    <div>
      댓글
      <div>닉네임: {comment.nickname}</div>
      <div>내용: {comment.body}</div>
      <button onClick={handleDeleteComment}>삭제</button>
    </div>
  );
};

export default Comment;

'use client';

import { MoreIcon } from '@public/image/svg';
import { deleteComment } from 'api/posts.api';
import cx from 'classnames';
import { CommonButton } from 'components/common/inputs/CommonButton/CommonButton';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { CommentType } from 'types/comment';
import styles from './Comment.module.scss';

const Comment = ({ comment }: { comment: CommentType }) => {
  const [isToggleOn, setIsToggleOn] = useState(false);
  const queryClient = useQueryClient();
  const commentDeleteMutation = useMutation(deleteComment, {
    onSuccess: (res) => {
      alert('삭제되었습니다.');
      queryClient.invalidateQueries('getComment');
    },
  });

  const handleDeleteComment = () => {
    commentDeleteMutation.mutate({ postId: comment.postId, commentId: comment.id, password: '1234' });
    setIsToggleOn(false);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <div className={styles.infoWrapper}>
          <h4>{comment.nickname}</h4>
          <span className={styles.date}>{comment.writeTime || '2023. 03. 21. 21:43'}</span>
        </div>
        <div className={styles.toggleWrapper}>
          <button onClick={() => setIsToggleOn(!isToggleOn)}>
            <MoreIcon />
          </button>
          <div className={cx(styles.toggleItem, { [styles.hidden]: !isToggleOn })}>
            <CommonButton width="60px" onClick={handleDeleteComment}>
              삭제
            </CommonButton>
          </div>
        </div>
      </div>
      <div className={styles.content}>{comment.body}</div>
    </div>
  );
};

export default Comment;

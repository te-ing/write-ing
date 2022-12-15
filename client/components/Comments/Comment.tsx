import { CommentType } from 'types/comment';
import styles from './Comment.module.scss';

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div>
      댓글
      <div>{comment.nickname}</div>
      <div>{comment.content}</div>
    </div>
  );
};

export default Comment;

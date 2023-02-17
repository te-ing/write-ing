import { CommentType } from 'types/comment';
import styles from './Comment.module.scss';

const Comment = ({ comment }: { comment: CommentType }) => {
  return (
    <div>
      댓글
      <div>닉네임: {comment.nickname}</div>
      <div>내용: {comment.body}</div>
    </div>
  );
};

export default Comment;

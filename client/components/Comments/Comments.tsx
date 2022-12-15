import styles from './Comments.module.scss';
import { CommentInput, Comment } from '.';
import { CommentType } from 'types/comment';

const Comments = ({ comments }: { comments: CommentType[] }) => {
  return (
    <div>
      댓글창
      <CommentInput />
      <div>
        {comments.map((comment) => {
          return (
            <div key={comment.id}>
              <Comment comment={comment} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Comments;

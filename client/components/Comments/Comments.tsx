'use client';

import styles from './Comments.module.scss';
import { CommentInput, Comment } from '.';
import { CommentType } from 'types/comment';
import { PostType } from 'types/post';
import { useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import { getComment } from 'api/posts.api';

interface CommentsProps {
  post: PostType;
}

const Comments = ({ post }: CommentsProps) => {
  const { data: comments, isLoading, isError } = useQuery('getComment', async () => await getComment(post.id));

  return (
    <div>
      댓글창
      <CommentInput postId={post.id} />
      {isLoading ? (
        <div>loading..</div>
      ) : (
        <div>
          {comments.map((comment) => {
            return (
              <div key={comment.id}>
                <Comment comment={comment} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comments;

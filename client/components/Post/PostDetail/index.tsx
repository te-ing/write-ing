'use client';

import React, { useRef } from 'react';
import { PostType } from 'types/post';
import PostDetailHeader from './PostDetailHeader';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { deletePost } from 'api/posts.api';

const PostDetail = ({ post }: { post: PostType }) => {
  const viewerRef = useRef(null);

  const postDelete = async () => {
    const result = await deletePost(post.id);
    console.log(result);
  };

  return (
    <div>
      <button onClick={postDelete}>삭제</button>

      <Viewer ref={viewerRef} initialValue={post.content} />
      {/* <PostDetailHeader /> */}
    </div>
  );
};

export default PostDetail;

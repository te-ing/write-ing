'use client';

import React, { useRef } from 'react';
import { PostType } from 'types/post';
import PostDetailHeader from './PostDetailHeader';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
// const Viewer = dynamic(() => import('@toast-ui/react-editor'));
const PostDetail = ({ post }: { post: PostType }) => {
  const viewerRef = useRef(null);
  return (
    <div>
      <Viewer ref={viewerRef} initialValue={post.content} />
      {/* <PostDetailHeader /> */}
    </div>
  );
};

export default PostDetail;

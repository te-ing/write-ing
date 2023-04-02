'use client';

import React, { useRef } from 'react';
import { PostType } from 'types/post';
import styles from './PostDetail.module.scss';
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Viewer } from '@toast-ui/react-editor';
import { deletePost } from 'api/posts.api';
import { useRouter } from 'next/navigation';
import Tag from 'components/Tag';
import PostDetailFooter from './PostDetailFooter';

const PostDetail = ({ post }: { post: PostType }) => {
  const viewerRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div aria-label="content">
        {post.tag && <Tag label={post.tag} />}
        <h2 className={styles.title}>{post.title}</h2>
        {post.subtitle && <h4 className={styles.subTitle}>{post.subtitle}</h4>}

        <Viewer ref={viewerRef} initialValue={post.content} />
      </div>
      <PostDetailFooter postId={post.id} />
    </div>
  );
};

export default PostDetail;

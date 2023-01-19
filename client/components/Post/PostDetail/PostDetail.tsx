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
  console.log(post);
  const viewerRef = useRef(null);

  return (
    <div className={styles.wrapper}>
      <div aria-label="content">
        <Tag label="태그 선택" />
        <h2 className={styles.title}>{post.title}</h2>
        <h4 className={styles.subTitle}>{post.subtitle || '서브타이틀입니다'}</h4>

        <Viewer ref={viewerRef} initialValue={post.content} />
      </div>
      <PostDetailFooter postId={post.id} />
    </div>
  );
};

export default PostDetail;

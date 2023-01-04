'use client';

import styles from './PostContent.module.scss';
import { useEffect, useRef } from 'react';

const PostContent = ({ content }: { content: string }) => {
  const contentRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    contentRef.current.innerHTML = content;
  }, []);

  return <div className={styles.content} ref={contentRef}></div>;
};

export default PostContent;

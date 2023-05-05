import { useRouter } from 'next/navigation';
import React from 'react';
import styles from './PostDetailFooter.module.scss';

const PostDetailFooter = ({ postId }: { postId: number }) => {
  const router = useRouter();
  // const postDelete = async () => {
  //   const result = await deletePost(postId);
  //   router.push('/home');
  // };

  return <div className={styles.wrapper}>{/* PostDetailFooter<button onClick={postDelete}>삭제</button> */}</div>;
};

export default PostDetailFooter;

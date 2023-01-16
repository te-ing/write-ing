'use client';

import axios from 'axios';
import PostCard from 'components/Post/PostCard';
import { useQuery } from 'react-query';
import { PostType } from 'types/post';
import styles from './page.module.scss';

export default function HomePage() {
  const getPostList = async (): Promise<PostType[]> => {
    const { data } = await axios(`${process.env.NEXT_PUBLIC_SERVER_BASE_URL}/api/post/list`);
    return data;
  };

  const { isLoading, isError, data } = useQuery('posts', getPostList);

  return (
    <div className={styles.postCard_wrapper}>
      {isLoading
        ? 'Loading..'
        : data.map((post) => {
            return <PostCard post={post} key={post.id} />;
          })}
    </div>
  );
}

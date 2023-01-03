import PostCard from 'components/Post/PostCard';
import { PostType } from 'types/post';
import styles from './page.module.scss';

const getPostList = async (): Promise<PostType[]> => {
  const response = await fetch('http://localhost:8080/api/post/list');
  const data = await response.json();
  return data;
};

export default async function Home() {
  const posts = await getPostList();
  return (
    <div className={styles.postCard_wrapper}>
      {posts.map((post) => {
        return <PostCard post={post} key={post.id} />;
      })}
    </div>
  );
}

import PostCard from 'components/Post/PostCard';
import { PostType } from 'types/post';
import styles from './page.module.scss';

const getPost = async (): Promise<PostType[]> => {
  const response = await fetch('http://localhost:8080/api/post');
  const { article } = await response.json();
  return article;
};

export default async function Home() {
  const posts = await getPost();
  return (
    <div className={styles.postCard_wrapper}>
      {posts.map((post) => {
        return <PostCard post={post} key={post.id} />;
      })}
    </div>
  );
}

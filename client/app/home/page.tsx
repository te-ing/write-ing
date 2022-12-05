import PostCard from 'components/Post/PostCard';
import styles from './page.module.scss';

export default function Home() {
  return (
    <div className={styles.postCard_wrapper}>
      <PostCard />
      <PostCard />
      <PostCard />
    </div>
  );
}
